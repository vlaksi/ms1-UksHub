# Generated by Django 3.1 on 2021-11-24 22:13

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
            name='Branch',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('child_branchs', models.ManyToManyField(blank=True, related_name='_branch_child_branchs_+', to='versioningapp.Branch')),
            ],
        ),
        migrations.CreateModel(
            name='CollaborationType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='CollaboratorDto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('collaboration_id', models.IntegerField()),
                ('username', models.CharField(max_length=200)),
                ('role', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('path', models.CharField(max_length=200)),
                ('creation_date', models.DateTimeField(verbose_name='date of creation')),
            ],
        ),
        migrations.CreateModel(
            name='Repository',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.CharField(blank=True, max_length=200)),
                ('actions', models.ManyToManyField(blank=True, related_name='action_of_repositorys', to='useractivityapp.Action')),
                ('author', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('default_branch', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='default_branch', to='versioningapp.branch')),
                ('forked_from_author', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='authorRepositoryForkedFrom', to=settings.AUTH_USER_MODEL)),
                ('members', models.ManyToManyField(blank=True, related_name='member_of_repositorys', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Folder',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('last_change', models.DateTimeField(verbose_name='last change')),
                ('files', models.ManyToManyField(blank=True, to='versioningapp.File')),
                ('parent_directory', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='parent_folder', to='versioningapp.folder')),
                ('sub_directories', models.ManyToManyField(blank=True, related_name='_folder_sub_directories_+', to='versioningapp.Folder')),
            ],
        ),
        migrations.CreateModel(
            name='Commit',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=200)),
                ('creation_date', models.DateTimeField(verbose_name='date of creation')),
                ('autor', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='created_commits', to=settings.AUTH_USER_MODEL)),
                ('comments', models.ManyToManyField(blank=True, related_name='commit', to='useractivityapp.Comment')),
                ('files', models.ManyToManyField(to='versioningapp.File')),
            ],
        ),
        migrations.CreateModel(
            name='Collaboration',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('collaboration_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='versioningapp.collaborationtype')),
                ('collaborator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('repository', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='repositoryCollaborations', to='versioningapp.repository')),
            ],
        ),
        migrations.AddField(
            model_name='branch',
            name='commits',
            field=models.ManyToManyField(blank=True, to='versioningapp.Commit'),
        ),
        migrations.AddField(
            model_name='branch',
            name='files',
            field=models.ManyToManyField(blank=True, to='versioningapp.File'),
        ),
        migrations.AddField(
            model_name='branch',
            name='folders',
            field=models.ManyToManyField(blank=True, to='versioningapp.Folder'),
        ),
        migrations.AddField(
            model_name='branch',
            name='parent_branch',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='versioningapp.branch'),
        ),
        migrations.AddField(
            model_name='branch',
            name='repository',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='repositoryBranches', to='versioningapp.repository'),
        ),
    ]
