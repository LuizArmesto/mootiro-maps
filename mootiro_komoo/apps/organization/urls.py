# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.conf.urls.defaults import patterns, url

from mootiro_komoo.urls import multiurls
from community.urls import home_urls as commu_prefs


pref_urls = commu_prefs + [r'^']
home_urls = [p + "organization/ORGANIZATION_SLUG/" for p in pref_urls]

view_defs = [
    (r'organization/new/?$', 'new_organization', 'new_organization'),
    (r'organization/new/from_map/?$', 'new_organization_from_map', 'new_organization_from_map'),
    (r'organization/ORGANIZATION_SLUG/edit/?$', 'edit_organization', 'edit_organization'),
    (r'organization/ORGANIZATION_SLUG/?$', 'show', 'view_organization'),
    (r'organizations/?$', 'organization_list', 'organization_list'),
]

urlpatterns = patterns('organization.views',
    url(r'^organization/add_org_from_map/?$', 'add_org_from_map',
            name='add_org_from_map'),
    url(r'^organization/add_branch_from_map/?$', 'add_branch_from_map',
            name='add_branch_from_map'),
    url(r'^organization/branch/edit/$', 'edit_inline_branch',
            name='edit_inline_branch'),
    url(r'^organization/verify_name/$', 'verify_org_name',
            name='verify_org_name'),
    url(r'^organization/search_by_name/$', 'search_by_name',
            name='organization_search_by_name'),
    url(r'^organization/search_by_tag/$', 'search_by_tag',
            name='organization_search_by_tag'),
    * (multiurls(pref_urls, view_defs))
)
