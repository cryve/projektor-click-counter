import { Template } from 'meteor/templating';
import { Projects } from 'meteor/projektor:projects';
import { incrementClickCount } from '../methods.js';
import './click_counter.html';

Template.clickCounter.events({
  'click #btn-click-counter'() {
    incrementClickCount.call({
      projectId: this._id,
    }, (err, res) => {
      if(err) {
        alert(err);
      }
    });
  },
});
