from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .encoders import (
    AutomobileVOEncoder,
    TechnicianEncoder,
    AppointmentEncoder,
)
from .models import Technician, Appointment, AutomobileVO


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse({"technicians": technicians}, encoder=TechnicianEncoder)
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(technician, encoder=TechnicianEncoder, safe=False)
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Technician Input"},
                status=400,
            )


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


@require_http_methods({"GET"})
def api_list_automobiles(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.all()
        return JsonResponse({"automobiles": automobiles}, encoder=AutomobileVOEncoder)


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.exclude(status="Canceled").exclude(
            status="Finished"
        )
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
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
                {"message": "Invalid appointment id"},
                status=400,
            )
    else:
        try:
            content = json.loads(request.body)
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


@require_http_methods(["GET"])
def api_service_history(request):
    appointments = Appointment.objects.all()
    return JsonResponse(
        {"appointments": appointments},
        encoder=AppointmentEncoder,
    )
