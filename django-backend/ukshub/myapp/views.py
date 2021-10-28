from django.shortcuts import render

from django.http import HttpResponse

from .models import Book

def index(request):
    return render(request, 'hello.html', {'name': 'MaliBajo'})

def book_by_id(request, book_id):
    book = Book.objects.get(pk=book_id)
    return HttpResponse(f"Book: {book.title}, publish on {book.pub_date}")
