from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Technician, Appointment, AutomobileVO


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold", "color", "year", "model"]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["first_name", "last_name", "employee_id"]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = ["date_time", "reason", "status", "vin", "customer", "technician"]


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse({"technicians": technicians}, encoder=TechnicianEncoder)
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.create(**content)
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Technician Input"},
                status=400,
            )
        return JsonResponse(technician, encoder=TechnicianEncoder, safe=False)


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_technicians(request, pk):
    pass


@require_http_methods(["GET", "POST"])
def api_list_appointments(request, pk):
    pass


@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_appointments(request, pk):
    pass
