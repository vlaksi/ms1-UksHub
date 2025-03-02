from django.db import models

# TODO: Make DTOs which are not as modal, currently do not know how to do it
# problem with pure DTO is that i can not find a way how to serialize him 
class CollaboratorDto(models.Model):
    collaboration_id = models.IntegerField()
    collaborator_id = models.IntegerField()
    username = models.CharField(max_length=200)
    role = models.CharField(max_length=200)

    @classmethod
    def create(cls, collaboration_id,collaborator_id, username, role):
        collaborator = cls(collaboration_id=collaboration_id,collaborator_id=collaborator_id, username=username, role=role)
        return collaborator

class GitServerCommitDto(models.Model):
    hash = models.CharField(max_length=200)
    committed_date = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    message = models.CharField(max_length=200)
    files = models.CharField(max_length=30000)
    total = models.CharField(max_length=200)

    @classmethod
    def create(cls, hash, committed_date, author, message, files, total):
        gitServerCommitDto = cls(hash=hash, committed_date=committed_date, author=author, message=message, files=files, total=total)
        return gitServerCommitDto

class GitServerBranchDto(models.Model):
    name = models.CharField(max_length=200)

    @classmethod
    def create(cls, name):
        branch = cls(name=name)
        return branch