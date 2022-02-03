# Generated by Django 3.2.9 on 2022-02-03 20:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('useractivityapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CollaborationType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='CollaboratorDto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('collaboration_id', models.IntegerField()),
                ('collaborator_id', models.IntegerField()),
                ('username', models.CharField(max_length=200)),
                ('role', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='GitServerBranchDto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='GitServerCommitDto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hash', models.CharField(max_length=200)),
                ('committed_date', models.CharField(max_length=200)),
                ('author', models.CharField(max_length=200)),
                ('message', models.CharField(max_length=200)),
                ('files', models.CharField(max_length=30000)),
                ('total', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Repository',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.CharField(blank=True, max_length=200)),
                ('default_branch', models.CharField(default='master', max_length=200)),
                ('actions', models.ManyToManyField(blank=True, related_name='action_of_repositorys', to='useractivityapp.Action')),
                ('author', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('forked_from_author', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='authorRepositoryForkedFrom', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Visit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('unique_fingerprint', models.CharField(max_length=200)),
                ('visit_date', models.DateTimeField(verbose_name='date of visit')),
                ('repository', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='repositoryVisit', to='versioningapp.repository')),
            ],
        ),
        migrations.AddField(
            model_name='repository',
            name='visits',
            field=models.ManyToManyField(blank=True, related_name='visits_of_repositorys', to='versioningapp.Visit'),
        ),
        migrations.CreateModel(
            name='Commit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=200)),
                ('hash', models.CharField(max_length=1000, verbose_name='hash')),
                ('creation_date', models.DateTimeField(verbose_name='date of creation')),
                ('autor', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='created_commits', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Collaboration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('collaboration_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='versioningapp.collaborationtype')),
                ('collaborator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('repository', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='repositoryCollaborations', to='versioningapp.repository')),
            ],
        ),
        migrations.CreateModel(
            name='Branch',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('commits', models.ManyToManyField(blank=True, to='versioningapp.Commit')),
                ('repository', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='repositoryBranches', to='versioningapp.repository')),
            ],
        ),
    ]
