from django.db import models


class Attendee(models.Model):

    ROLE_CHOICES = [
        ("partner", "Partner"),
        ("oak_staff", "OAK Staff"),
        ("coordination", "Coordination Team"),
        ("presenter", "Presenter"),
        ("observer", "Observer"),
    ]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    organization = models.CharField(max_length=200)

    sub_partner_program_area = models.CharField(
        max_length=200,
        blank=True
    )

    role = models.CharField(
        max_length=30,
        choices=ROLE_CHOICES
    )

    email = models.EmailField()
    phone = models.CharField(max_length=30)

    dietary_requirements = models.TextField(
        blank=True
    )

    accessibility_requirements = models.TextField(
        blank=True
    )

    travel_requirements = models.TextField(
        blank=True
    )

    accommodation_requirements = models.TextField(
        blank=True
    )

    consent_given = models.BooleanField(
        default=False
    )

    registration_date = models.DateTimeField(
        auto_now_add=True
    )

    registration_status = models.BooleanField(
        default=True
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name}"