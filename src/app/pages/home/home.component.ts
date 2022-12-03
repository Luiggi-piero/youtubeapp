import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models';
import { YoutubeService } from 'src/app/services/youtube.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  videos: Video[] = [];
  constructor(private youtubeService: YoutubeService) {}

  ngOnInit(): void {
    this.loadVideos();
  }

  loadVideos(): void{
    this.youtubeService.getVideos().subscribe((response) => this.videos.push(...response));
  }

  showVideo(video: Video): void {
    Swal.fire({
      html: `
      <h5>${ video.title }</h5>
      <iframe 
        width="100%" 
        height="315" 
        src="https://www.youtube.com/embed/${ video.resourceId.videoId }" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; 
        autoplay; clipboard-write; 
        encrypted-media; gyroscope; 
        picture-in-picture" 
        allowfullscreen>
      </iframe>`,
    });
  }
}
