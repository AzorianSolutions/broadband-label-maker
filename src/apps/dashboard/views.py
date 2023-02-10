from django.shortcuts import render


def index(request):
    params: dict = {

    }

    return render(request, 'dashboard/index.jinja2', params)
