import json
import glob

from django.core.exceptions import ValidationError
from django.http import HttpResponse
from projects.models import Measurement


def get_measurement(request, measurement_id):
    try:
        m = Measurement.objects.get(id=measurement_id)
        response = {
            "description": m.description,
            "analysis": m.analysis,
            "evaluation": m.evaluation,
            "screenshot_path": m.screenshot_path,
            "setup_path": m.setup_path,
            "raw_data_path": m.raw_data_path,
            "date_time": str(m.date_time),
            "temperature": m.temperature
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

def get_screenshot(request, measurement_id):
    req_data = request.read().decode('utf-8')
    screenshot_path = ""

    try:
        m = Measurement.objects.get(id=measurement_id)
        screenshot_path = m.screenshot_path
    except ValidationError:
        return HttpResponse("Screenshot not found")

    screenshots = glob.glob("." + screenshot_path + "/*")

    for img in screenshots:
        print(img)
        with open(img, "rb") as imageFile:
            return HttpResponse(imageFile.read(), content_type="image/png")

    return HttpResponse("No screenshots found.")