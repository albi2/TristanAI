import { PorterStemmer, JaroWinklerDistance} from "natural";
import trainJSON from '../classifier.json';

const docs = trainJSON['docs']

function check_distance(stemmed_word: string, actual_word: string) {
    // Check distance between first and second word using Jaro edit algorithm
    const stemmed_actual_word = PorterStemmer.stem(actual_word);



    return JaroWinklerDistance(stemmed_actual_word, stemmed_word, { ignoreCase: true });
}

export default function check_actual_word(label: string, word: string) {    
    // Find a string from the docs with the given labels that has a distance at least 0.5 with the given word
    for(let i = 0; i < docs.length; i++) {
       const document = docs[i];
       console.log('LABEL', label)
       console.log('WORD', word)

       console.log(check_distance(document.text[0], word))
       if(document.label === label && check_distance(document.text[0], word) > 0.5) {
            console.log("MATCHED WORD", document.text[0])
            return true;
       }
    }
    // If none found that has a close distance to the given word in its stemmed form than return false

    return false;
}