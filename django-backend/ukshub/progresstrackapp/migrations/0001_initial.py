# Generated by Django 3.2.9 on 2022-02-01 19:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Issue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('creation_date', models.DateTimeField(verbose_name='date of creation')),
                ('is_opened', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Label',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('color', models.CharField(max_length=200)),
                ('decription', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Milestone',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('due_date', models.DateTimeField(verbose_name='due date')),
                ('description', models.CharField(max_length=200)),
                ('is_opened', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='PullRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('base_branch', models.CharField(max_length=200)),
                ('compare_branch', models.CharField(max_length=200)),
                ('is_able_to_merge', models.BooleanField(default=False)),
                ('is_merged', models.BooleanField(default=False)),
                ('is_approved', models.BooleanField(default=False)),
                ('creation_date', models.DateTimeField(verbose_name='creation date')),
                ('title', models.CharField(max_length=200)),
                ('assigness', models.ManyToManyField(blank=True, related_name='pull_request_assigned_to_me', to=settings.AUTH_USER_MODEL)),
                ('author', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('issues', models.ManyToManyField(blank=True, to='progresstrackapp.Issue')),
                ('labels', models.ManyToManyField(blank=True, to='progresstrackapp.Label')),
                ('milestones', models.ManyToManyField(blank=True, to='progresstrackapp.Milestone')),
            ],
        ),
    ]
