from django.contrib import admin
from .models import Attendee


@admin.register(Attendee)
class AttendeeAdmin(admin.ModelAdmin):
    list_display = (
        "first_name",
        "last_name",
        "organization",
        "role",
        "email",
        "registration_date",
    )

    list_filter = ("role", "registration_status")

    search_fields = (
        "first_name",
        "last_name",
        "organization",
        "email",
    )