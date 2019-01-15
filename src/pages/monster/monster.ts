import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CreatureService } from '../../services/creature.service';

import { AddCreaturePage } from '../add-creature/add-creature';

import { ICreature } from '../../services/creature.service';

@IonicPage()
@Component({
	selector: 'page-monster',
	templateUrl: 'monster.html',
})
export class MonsterPage {
    private creatures: ICreature[] = [];

 	constructor(public navCtrl: NavController, public navParams: NavParams, private creatureService: CreatureService) {}

	async ionViewWillEnter(){
		this.creatures = await this.creatureService.getCreature();
		this.creatures.sort(function(a, b){
			if(a.name < b.name) return -1;
			if(a.name > b.name) return 1;
			return 0;
		});
	}
	renderAddCreaturePage(creature?: ICreature){
		var isPlayer = false;
		if(creature != null)
			this.navCtrl.push(AddCreaturePage, {creature});
		else
			this.navCtrl.push(AddCreaturePage, { isPlayer });
	}
}
