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
    properties = ["first_name", "last_name", "employee_id", "id"]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = ["id", "date", "time", "reason", "status", "vin", "customer", "technician"]
    encoders = {
        "technician": TechnicianEncoder(),
    }


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


@require_http_methods(["DELETE"])
def api_show_technicians(request, pk):
    if request.method == "DELETE":
        count, _ = Technician.objects.filter(employee_id=pk).delete()
        if count > 0:
            return JsonResponse({"deleted": count > 0})
        else:
            return JsonResponse(
                {"message": "Invalid Technician id"},
                status=400,
            )


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.exclude(status="Canceled").exclude(status="Finished")
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            technician = Technician.objects.get(employee_id=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician id"},
                status=400,
            )

        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )


@require_http_methods(["PUT", "DELETE"])
def api_show_appointments(request, pk):
    if request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=pk).delete()
        if count > 0:
            return JsonResponse({"deleted": count > 0})
        else:
            return JsonResponse(
                {"message": "Invalid Appointment id"},
                status=400,
            )
    elif request.method == "PUT":
        content = json.loads(request.body)
        try:
            Appointment.objects.filter(id=pk).update(**content)
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid appointment id"},
                status=400,
            )
