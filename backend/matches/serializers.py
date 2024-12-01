from rest_framework import serializers
from .models import Match


class MatchSerializer(serializers.ModelSerializer):
    event_name = serializers.CharField(source='event.name')
    team1_name = serializers.CharField(source='team1.name')
    team2_name = serializers.CharField(source='team2.name')

    class Meta:
        model = Match
        fields = [
            'id', 'event_name', 'team1_name', 'team2_name',
            'scheduled_time', 'status'
        ]
