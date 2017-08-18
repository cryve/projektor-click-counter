import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import StubCollections from 'meteor/hwillson:stub-collections';
import { Projects } from 'meteor/projektor:projects';
import { assert } from 'chai';
import lodash from 'lodash';
import SimpleSchema from 'simpl-schema';
import { incrementClickCount } from './methods.js';

describe('click-counter', function() {
  let sampleProjectId;

  beforeEach(function() {
    StubCollections.stub([Projects]);
    clickCounterField = {
      name: "click-counter-clickCount",
      schema: SimpleSchema.Integer,
    };
    Projects.addField(clickCounterField);
    const creatorUserId = Random.id();
    const sampleProject = {
      state: { public: false, draft: true },
      title: 'Example Project',
      permissions: {
        editInfos: [creatorUserId],
        manageMembers: [creatorUserId],
        deleteProject: [creatorUserId],
      },
      team: [{
        userId: creatorUserId,
        role: 'Projektleitung',
        permissions: {
          editInfos: true,
          manageMembers: true,
          deleteProject: true,
        },
      }],
      'click-counter-clickCount': 0,
    };
    sampleProjectId = Projects.insert(sampleProject);
  });
  afterEach(function() {
    console.log(Projects);
    StubCollections.restore();
    console.log(Projects);
  });
  it('should have function "incrementClickCount()"', function() {
    assert.instanceOf(incrementClickCount, ValidatedMethod, 'method is a ValidatedMethod');
  });
  it('should increment click count', function() {
    const context = {};
    const args = { projectId: sampleProjectId };
    incrementClickCount._execute(context, args);

    const sampleProject = Projects.findOne(sampleProjectId);
    console.log(sampleProject);
    assert.equal(1, sampleProject['click-counter.clickCount']);
  });
});
