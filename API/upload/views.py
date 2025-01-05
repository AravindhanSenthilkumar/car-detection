from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Image
from .serializers import ImageSerializer
from django.http import JsonResponse

@api_view(['POST'])
def upload_image(request):
    if request.method == 'POST':
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def get_images(request):
    images = Image.objects.all()
    image_list = [{"id": img.id, "url": img.image.url} for img in images]
    print(image_list)
    return JsonResponse(image_list, safe=False)
