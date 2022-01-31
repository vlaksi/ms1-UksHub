# Generated by Django 3.2.9 on 2022-01-31 23:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('versioningapp', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('progresstrackapp', '0001_initial'),
        ('useractivityapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='pullrequest',
            name='base_branch',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='base_branchs', to='versioningapp.branch'),
        ),
        migrations.AddField(
            model_name='pullrequest',
            name='comments',
            field=models.ManyToManyField(blank=True, related_name='pull_request', to='useractivityapp.Comment'),
        ),
        migrations.AddField(
            model_name='pullrequest',
            name='compare_branch',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='compare_branch', to='versioningapp.branch'),
        ),
        migrations.AddField(
            model_name='pullrequest',
            name='issues',
            field=models.ManyToManyField(blank=True, to='progresstrackapp.Issue'),
        ),
        migrations.AddField(
            model_name='pullrequest',
            name='labels',
            field=models.ManyToManyField(blank=True, to='progresstrackapp.Label'),
        ),
        migrations.AddField(
            model_name='pullrequest',
            name='milestones',
            field=models.ManyToManyField(blank=True, to='progresstrackapp.Milestone'),
        ),
        migrations.AddField(
            model_name='pullrequest',
            name='repository',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pull_requests', to='versioningapp.repository'),
        ),
        migrations.AddField(
            model_name='pullrequest',
            name='reviewes',
            field=models.ManyToManyField(blank=True, related_name='wated_review_from_me', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='milestone',
            name='issues',
            field=models.ManyToManyField(blank=True, to='progresstrackapp.Issue'),
        ),
        migrations.AddField(
            model_name='milestone',
            name='repository',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='milestones', to='versioningapp.repository'),
        ),
        migrations.AddField(
            model_name='label',
            name='repository',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='labels', to='versioningapp.repository'),
        ),
        migrations.AddField(
            model_name='issue',
            name='assigness',
            field=models.ManyToManyField(blank=True, related_name='issue_assigned_to_me', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='issue',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='issue_created', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='issue',
            name='comments',
            field=models.ManyToManyField(blank=True, related_name='issue', to='useractivityapp.Comment'),
        ),
        migrations.AddField(
            model_name='issue',
            name='labels',
            field=models.ManyToManyField(blank=True, to='progresstrackapp.Label'),
        ),
        migrations.AddField(
            model_name='issue',
            name='repository',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='issues', to='versioningapp.repository'),
        ),
    ]
