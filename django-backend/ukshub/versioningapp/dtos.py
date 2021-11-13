from django.db import models

# TODO: Make DTOs which are not as modal, currently do not know how to do it
# problem with pure DTO is that i can not find a way how to serialize him 
class CollaboratorDto(models.Model):
    pk = models.IntegerField()
    username = models.CharField(max_length=200)
    role = models.CharField(max_length=200)

    @classmethod
    def create(cls, pk, username, role):
        collaborator = cls(pk=pk, username=username, role=role)
        return collaborator