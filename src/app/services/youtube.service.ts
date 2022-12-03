import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { YoutubeAPIResponse } from '../models';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private baseUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyCuF6pLdsYCl4ZnOx_y0CrFmpdQTkcRoGM';
  private playList = 'UU8U9xH4CN7bqoo80iNDWWvw';
  private nextPageToken = '';
  constructor(private http: HttpClient) {}

  getVideos() {
    const url = `${this.baseUrl}/playlistItems`;
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('playlistId', this.playList)
      .set('maxResults', '12')
      .set('key', this.apiKey)
      .set('pageToken', this.nextPageToken);
    return this.http.get<YoutubeAPIResponse>(url, { params }).pipe(
      map((data) => {
        this.nextPageToken = data.nextPageToken;
        return data.items;
      }),
      map((items) => items.map((item) => item.snippet))
    );
  }
}
