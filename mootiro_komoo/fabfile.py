#! /usr/bin/env python
# -*- coding:utf-8 -*-
import logging
from fabric.api import local

logging.basicConfig(format='>> %(message)s', level=logging.DEBUG)

#env.hosts = ['me@example.com:22']

django_settings = {
    'dev': '--settings=settings.development',
    'stage': '--settings=settings.staging',
    'prod': '--settings=settings.production'
}
env_ = 'dev'


def dev():
    """Set environment to development"""
    global env_
    env_ = 'dev'


def stage():
    """Set environment to staging"""
    global env_
    env_ = 'stage'


def prod():
    """Set environment to production"""
    global env_
    env_ = 'prod'


def setup_django():
    import os
    import sys
    PROJ_DIR = os.path.abspath(os.path.dirname(__file__))
    SITE_ROOT = os.path.abspath(os.path.join(PROJ_DIR, '..'))
    sys.path.append(PROJ_DIR)
    sys.path.append(SITE_ROOT)
    from django.core.management import setup_environ
    env_name = {'dev': 'development', 'stage': 'staging', 'prod': 'production'}
    environ = None
    exec 'from settings import {} as environ'.format(env_name[env_])
    setup_environ(environ)


def build_environment():
    """
    build env_ironment: pip install everything + patch django for postgis
    encoding problem on postgres 9.1
    """
    local("pip install -r settings/requirements.txt")
    local("patch -p0 `which python | "
        "sed -e 's/bin\/python$/lib\/python2.7\/site-packages\/django\/"
        "contrib\/gis\/db\/backends\/postgis\/adapter.py/'` "
        "../docs/postgis-adapter-2.patch")


def coffee_maker():
    """ runs coffeescript compiler"""
    # apps we want to compile our coffee files
    COFFEE_SHOP = ['main', 'komoo_map', 'user_cas', 'discussion',
                   'organization', 'komoo_project']
    for app in COFFEE_SHOP:
        local(
            'coffee -o apps/{app}/static/js/ -cw apps/{app}/static/coffee/ &'
            .format(app=app))


def kill_coffee_tasks():
    """kill all coffe node.js background tasks"""
    local('ps -eo pid,args | grep coffee | grep -v grep | grep -v [.]coffee | '
          'cut -c1-6 | xargs kill')


def run_celery():
    """runs celery task queue"""
    local('python manage.py celeryd -B --loglevel=info {} &'
          .format(django_settings[env_]))


def run():
    """Runs django's development server"""
    run_celery()
    if env_ != 'dev':
        local(
            'python manage.py run_gunicorn --workers=2 '
            '--bind=127.0.0.1:8001 {}'.format(django_settings[env_]))
    else:
        local('python manage.py runserver 8001 {}'
              .format(django_settings[env_]))


def collectstatic():
    """Runs static files collector"""
    local("python manage.py collectstatic {}".format(django_settings[env_]))


def kill_manage_tasks():
    """kill all manage.py background tasks"""
    local('ps -eo pid,args | grep manage.py | grep -v grep | cut -c1-6 | '
          'xargs kill')


def test(
        apps=" ".join([
            'community', 'need', 'organization', 'proposal', 'komoo_resource',
            'investment', 'main', 'user_cas', 'moderation']),
        recreate_db=False):
    """Run application tests"""
    if recreate_db:
        local('dropdb test_mootiro_komoo')
    else:
        logging.info("Reusing old last test DB...")
    local('REUSE_DB=1 python manage.py test {} {} --verbosity=1'
            .format(apps, django_settings[env_]))


def js_urls():
    """Creates a javascript file containing urls"""
    local('python manage.py js_urls {}'.format(django_settings[env_]))

    # remove trailing interrogations
    logging.info('removing trailing "?" from urls')
    import os
    s = ''
    with open(os.path.abspath(
                './apps/main/static/lib/django-js-utils/dutils.conf.urls.js'),
                'r') as f:
        s = f.read()
        s = s.replace('?', '')
    with open(os.path.abspath(
                './apps/main/static/lib/django-js-utils/dutils.conf.urls.js'),
                'w') as f:
        f.write(s)


def syncdb(create_superuser=""):
    """Runs syncdb (with no input flag by default)"""
    noinput = "" if create_superuser else "--noinput"
    local('python manage.py syncdb {} {}'
          .format(noinput, django_settings[env_]))


def recreate_db():
    """Drops komoo database and recreates it with postgis template."""
    logging.info("Recreating database 'komoo'")
    local('dropdb mootiro_komoo && createdb -T template_postgis mootiro_komoo')


def shell():
    """Launches Django interactive shell"""
    local('python manage.py shell {}'.format(django_settings[env_]))


def load_fixtures(type_='system'):
    """
    load fixtures (system and test).
    usage:
      fab load_fixtures  ->  loads all files which name ends with
                             '_fixtures.json' inside the fixtures folder
                             (except for 'test_fixtures.json')
      fab load_fixtures:test  -> load only the fixtures/test_fixtures.json file
    """
    import os
    if type_ == 'test':
        fixtures = ""
        folder = 'fixtures/test'
        for fixture in os.listdir(folder):
            if fixture.endswith('.json') and \
               fixture != 'contenttypes_fixtures.json':

                fixtures += "{}/{} ".format(folder, fixture)
        local('python manage.py loaddata {} {}'.format(fixtures,
                django_settings[env_]))
    else:
        for fixture in os.listdir('fixtures'):
            if fixture.endswith('_fixtures.json'):
                local('python manage.py loaddata fixtures/{} {}'.format(
                    fixture, django_settings[env_]))


def loaddata(fixture_file=None):
    """
    load a single fixture file
    usage:
        fab loaddata:fixture_file_path -> loads the given fixture file to db
    """
    if fixture_file:
        local('python manage.py loaddata {} {}'.format(
                    fixture_file, django_settings[env_]))
    else:
        logging.info("""
        Please provide a fixture file
        usage:
          fab loaddata:fixture_file_path -> loads the given fixture file to db
        """)


def initial_revisions():
    """
    load initial revisions for django-revisions module
    should run only once when installed/or when loaded a new app/model
    """
    local('python manage.py createinitialrevisions {}'
          .format(django_settings[env_]))


def makemessages(lang='pt_BR'):
    """create translations messages file"""
    local('python manage.py makemessages -l {} {}'.format(
        lang, django_settings[env_]))
    local('python manage.py makemessages -d djangojs -l {} {}'.format(
        lang, django_settings[env_]))


def compilemessages():
    """
    compile messages file
    """
    local('python manage.py compilemessages {}'
          .format(django_settings[env_]))


def clean_media_files():
    """removes all media uploaded files"""
    media_apps_list = ['upload', ]
    for app in media_apps_list:
        try:
            local('rm  -rf media/{}/'.format(app))
        except Exception as err:
            logging.error(err)


def sync_all(data_fixtures='fixtures/backupdb.json'):
    """
    restart app and database from scratch.
    It: drops the DB, recreates it, syncdb, load_fixtures and call
    initial_revisions, also makes coffee and hugs you. :)
    """
    recreate_db()
    syncdb()
    fix_contenttypes()
    if data_fixtures == "test":
        load_fixtures(data_fixtures)
    else:
        loaddata(data_fixtures)


def dumpdata():
    """Dump DB data, for backup purposes """
    import datetime
    local('python manage.py dumpdata {} > backupdb_{}.json'
          .format(django_settings[env_],
                  datetime.datetime.now().strftime('%Y_%m_%d')))


def supercow(email=None):
    """Grants admin supercow rights to a user."""
    setup_django()
    from django.contrib.auth.models import User
    user = User.objects.get(email=email)
    user.is_staff = True
    user.is_superuser = True
    user.save()
    logging.info('success')


def fix_contenttypes():
    """ remove auto added contenttypes from django for loading data """
    setup_django()
    from django.contrib.contenttypes.models import ContentType

    logging.info('cleaning contenttypes ... ')
    ContentType.objects.all().delete()
    loaddata('fixtures/contenttypes_fixtures.json')


def populate_history():
    setup_django()
    import reversion
    from community.models import Community
    from need.models import Need
    from proposal.models import Proposal
    from organization.models import Organization
    from komoo_resource.models import Resource
    from investment.models import Investment

    for model in [Community, Need, Proposal, Organization, Resource,
                  Investment]:
        for obj in model.objects.all():
            versions = reversion.get_for_object(obj)
            if versions:
                last = versions[0]
                # first = versions.reverse()[0]
                if last.type == 1:  # 1 == Edition
                    obj.last_editor = last.revision.user

                    # Disable auto now
                    for field in obj._meta.local_fields:
                        if field.name == "last_update":
                            field.auto_now = False
                    obj.last_update = last.revision.date_created
                    obj.save()


def help():
    """Fabfile documentation"""
    local('python -c "import fabfile; help(fabfile)"')

