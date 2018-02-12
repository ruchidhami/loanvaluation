import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Message } from './api';

import { Coordinate } from '../../valuation/cordinates';

declare var google: any;

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.css']
})
export class LocationPickerComponent implements OnInit {

  options: any;

  overlays: any[];

  dialogVisible: boolean;

  markerTitle: string;

  selectedPosition: any;

  infoWindow: any;

  draggable: boolean = true;

  msgs: Message[] = [];

  map: any;

  @Input() coordinates: Coordinate[] = [];

  @Output() onMarkerAdd = new EventEmitter<Coordinate[]>();

  ngOnInit() {
    this.infoWindow = new google.maps.InfoWindow();
    if (this.coordinates.length > 0) {
      this.overlays = [];
      for (let coordinate of this.coordinates) {
        this.addMarkerAtCoordinate(coordinate);
      }

      this.options = {
        center: {
          lat: this.coordinates[0].lat,
          lng: this.coordinates[0].lng
        },
        zoom: 20
      };
    } else {
      this.options = {
        //Location of nepal
        center: { lat: 27.710582657565602, lng: 85.34866333007812 },
        zoom: 20
      };
      this.initOverlays();
    }

  }

  handleMapClick(event) {
    if (this.overlays.length >= 2) {
      return;
    }
    this.dialogVisible = true;
    this.selectedPosition = event.latLng;
  }

  addMarkerAtCoordinate(coordinate: Coordinate) {
    var marker = new google.maps.Marker(
      {
        position: {
          lat: coordinate.lat,
          lng: coordinate.lng
        },
        title: coordinate.title,
        draggable: this.draggable,

      });
    this.overlays.push(marker);
    var info = new google.maps.InfoWindow({
      content: coordinate.title
    });
    info.open(this.map, marker);
  }


  addMarker() {
    var marker = new google.maps.Marker(
      {
        position: {
          lat: this.selectedPosition.lat(),
          lng: this.selectedPosition.lng()
        },
        title: this.markerTitle,
        draggable: this.draggable,

      });
    let c = new Coordinate(this.selectedPosition.lat(), this.selectedPosition.lng(), this.markerTitle)
    this.coordinates.push(c)
    this.onMarkerAdd.emit(this.coordinates);

    this.overlays.push(marker);
    var info = new google.maps.InfoWindow({
      content: this.markerTitle
    });
    info.open(this.map, marker);
    this.markerTitle = null;
    this.dialogVisible = false;
  }

  handleDragEnd(event) {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Marker Dragged', detail: event.overlay.getTitle() });
  }

  handleOverlayClick(event) {
    this.map = event.map;
    this.msgs = [];
    event.map.setCenter(event.overlay.getPosition());
  }

  initOverlays() {
    if (!this.overlays || !this.overlays.length) {
      this.overlays = [];
    }
  }

  zoomIn(map) {
    map.setZoom(map.getZoom() + 1);
  }

  zoomOut(map) {
    map.setZoom(map.getZoom() - 1);
  }

  clear() {
    this.overlays = [];
    this.coordinates = [];
  }
}


