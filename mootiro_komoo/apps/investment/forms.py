# -*- coding: utf-8 -*-
from __future__ import unicode_literals  # unicode by default

from django import forms
from django.forms import ModelForm

from annoying.decorators import autostrip
from markitup.widgets import MarkItUpWidget
from crispy_forms.layout import *

from main.utils import MooHelper
from investment.models import Investment

from main.widgets import TaggitWidget, Datepicker


@autostrip
class InvestmentForm(ModelForm):

    class Meta:
        model = Investment

    description = forms.CharField(widget=MarkItUpWidget())
    date = forms.Field(widget=Datepicker(format="%d-%m-%Y"))
    end_date = forms.Field(widget=Datepicker(format="%d-%m-%Y"))
    tags = forms.Field(
        widget=TaggitWidget(autocomplete_url="/need/tag_search"),
        required=False
    )

    def __init__(self, *a, **kw):
        # Crispy forms configuration
        self.helper = MooHelper()
        self.helper.form_id = "investment_form"
        self.helper.layout = Layout(
            "title",
            "description",
            Row(
                "date",
                "end_date",
            ),
            "over_period",
            Row(
                "currency",
                "value",
            ),
            "tags",
        )

        super(InvestmentForm, self).__init__(*a, **kw)