import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController, Tabs, NavParams } from 'ionic-angular';

import firebase from 'firebase/app';

import { CardsPage } from  '../cards/cards';
import { AddtutoriaPage } from '../addtutoria/addtutoria';
import { TutoriasPage } from '../tutorias/tutorias';
import { TutoriastakePage } from '../tutoriastake/tutoriastake';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public myPhotoURL: any;
  @ViewChild("paymentTabs") paymentTabs: Tabs;
  cardsRoot = CardsPage;
  addRoot = AddtutoriaPage;
  tutoriasRoot = TutoriasPage;
  tutoriastake = TutoriastakePage;
  shouldHide = false;
  uid = firebase.auth().currentUser.uid;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController,
  public navParams: NavParams) {

    firebase.storage().ref().child('Photos/assets/programacion.png').getDownloadURL().then(url =>{
      this.myPhotoURL = url;
    });

    firebase.database().ref('users/' + this.uid).on('value', data =>{
      if(data.val() != null){
        data.val().tutor;
        //console.log(data.val().tutor);
        if(data.val().tutor == true){
          this.shouldHide = true;
        }
      }
    });

    this.menuCtrl.enable(true, 'menu');

    if(this.navParams.get("cardName") != null){
      this.navCtrl.push(CardsPage, {
        cardName : this.navParams.get('cardName')
      });
    }
  }

  ionViewDidEnter(){
    //console.log("home");
  }
}
