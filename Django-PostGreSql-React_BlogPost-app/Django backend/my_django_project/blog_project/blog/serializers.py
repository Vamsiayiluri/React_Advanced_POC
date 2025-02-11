from rest_framework import viewsets
from rest_framework import serializers
from .models import Post

# Serializer for Post model
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author', 'created_at', 'updated_at', 'published_at', 'is_published']

# ViewSet to handle CRUD operations for Blog Posts
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
