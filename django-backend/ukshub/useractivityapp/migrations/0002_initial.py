# Generated by Django 3.2.9 on 2022-02-03 20:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('versioningapp', '0001_initial'),
        ('useractivityapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='action',
            name='new_forked_repository',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='actionNewForkedRepository', to='versioningapp.repository'),
        ),
        migrations.AddField(
            model_name='action',
            name='repository',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='repositoryActions', to='versioningapp.repository'),
        ),
        migrations.AddConstraint(
            model_name='action',
            constraint=models.UniqueConstraint(fields=('author', 'repository', 'action_type'), name='unique_action_constraint'),
        ),
    ]
