import { Component, OnInit } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'app-introconclusao',
  templateUrl: './introconclusao.component.html',
  styleUrls: ['./introconclusao.component.css']
})
export class IntroconclusaoComponent implements OnInit {

  yt_iframe_html: any;

  youtubeUrl = "https://www.youtube.com/watch?v=y4IqDI0paTA";

  constructor(private embedService: EmbedVideoService) { 
    this.yt_iframe_html = this.embedService.embed(this.youtubeUrl);
  }

  ngOnInit() {
 
  }



}
