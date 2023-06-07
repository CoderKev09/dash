from django.db import models


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=100, unique=True)
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100, default="")


class Appointment(models.Model):
    date = models.DateField(default="2023-10-21")
    time = models.TimeField(default="18:00")
    reason = models.TextField()
    status = models.CharField(max_length=100, default="Created")
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=100)
    technician = models.ForeignKey(
        Technician, related_name="appointment", on_delete=models.CASCADE
    )
