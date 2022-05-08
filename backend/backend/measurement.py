import json

from django.core.exceptions import ValidationError
from django.http import HttpResponse
from projects.models import Measurement


def get_measurement(request, measurement_id):
    try:
        m = Measurement.objects.get(id=measurement_id)
        response = {
            "description": m.description,
            "analysis": m.analysis,
            "evaluation": m.evaluation
        }
        return HttpResponse(json.dumps(response))
    except ValidationError:
        return HttpResponse("")


def update_measurement(request, measurement_id):
    req_data = request.read().decode('utf-8')
    data = json.loads(req_data)

    try:
        m = Measurement.objects.get(id=measurement_id)
        m.description = data["description"]
        m.analysis = data["analysis"]
        m.evaluation = data["evaluation"]
        m.save()
    except ValidationError:
        return HttpResponse("Failed")

    return HttpResponse("Success")