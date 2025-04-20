// src/app/series/series-list/series-list.component.ts
import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../serie.service';
import { Serie } from '../serie';

@Component({
  selector: 'app-series-list',
  templateUrl: './serie-list.component.html',
  styleUrls: ['./serie-list.component.css']
})
export class SeriesListComponent implements OnInit {
  series: Serie[] = [];
  selectedSerie: Serie | null = null;
  averageSeasons: number = 0;

  constructor(private seriesService: SeriesService) {}

  ngOnInit() {
    this.seriesService.getSeries().subscribe(series => {
      this.series = series;
      this.averageSeasons = this.calculateAverageSeasons(series);
    });
  }

  selectSerie(serie: Serie) {
    this.selectedSerie = serie;
  }

  calculateAverageSeasons(series: Serie[]): number {
    const totalSeasons = series.reduce((sum, serie) => sum + serie.seasons, 0);
    return Math.round(totalSeasons / series.length);
  }
}
