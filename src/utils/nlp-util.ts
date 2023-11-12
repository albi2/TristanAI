import { BayesClassifier } from "natural";

export default class NlpTrainUtil {
  private _classifier: BayesClassifier;

  constructor() {
    // Initialize classifier
    this._classifier = new BayesClassifier();
  }

  public trainForIntents(save_json: boolean = false) {
    // Classification intent saving data
    this._classifier.addDocument("hello", "greeting");
    this._classifier.addDocument("hi", "greeting");
    this._classifier.addDocument("howdy", "greeting");
    this._classifier.addDocument("hey", "greeting");
    this._classifier.addDocument("hola", "greeting");
    this._classifier.addDocument("yo", "greeting");
    this._classifier.addDocument("what's up", "greeting");

    // Farewell intent training data
    this._classifier.addDocument("bye", "goodbye");
    this._classifier.addDocument("goodbye", "goodbye");
    this._classifier.addDocument(["see", "you", "soon"], "goodbye")
    this._classifier.addDocument("i'm out", "goodbye");
    this._classifier.addDocument(["gotta", "get", "going"], "goodbye");
    this._classifier.addDocument("later", "goodbye");
    this._classifier.addDocument("good bye", "goodbye");

    // Smalltalk
    this._classifier.addDocument('ok', 'smalltalk');
    this._classifier.addDocument('okay', 'smalltalk');
    this._classifier.addDocument('alright', 'smalltalk');
    this._classifier.addDocument('yeah', 'smalltalk');
    this._classifier.addDocument('haha', 'smalltalk');
    this._classifier.addDocument(["nice", "one"], "smalltalk")
    this._classifier.addDocument("hmm", "smalltalk")

    this._classifier.train();

    if(save_json) {
        this._classifier.save('classifier.json', function(err, classifier) {
            // the classifier is saved to the classifier.json file!
            console.log("TRAINING FINISHED, RESULTS ARE FOUND ON classifier.json file")
        });
    }
  }

  get classifier() {
    return this._classifier;
  }
}
