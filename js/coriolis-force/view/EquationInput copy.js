// import Constants from '../../common/BeadOnHoopConstants.js';
import { DOM, Display, Input, VBox, Node, KeyboardUtils } from '../../../../scenery/js/imports.js';
import Property from '../../../../axon/js/Property.js';
// import post from '../../common/postData.js';
// import {getInterface} from '../../common/mathquill.js'
// var MathQuill = require("../../common/mathquill.js");
export default class EquationInput extends Node {
  constructor( screenNode,parentDomElement, options ) {

    options = _.merge( {

      // can limit contents of the input
      inputType: 'text', // 'text' | 'number'

      domElement: null,
      thetaElement:null,
      velocityElement:null,

      onlyLetters: false,

      // number of characters if you want to customize
      width: null,

      // the initial text for the element
      initialText: '',

      equation: null,
      
      verifyEq: null,
      dom:null,
      // errField: null,

      linkObj: null,

      focusedEq: null

    }, options );

    super( options );

    this.valueSubmittedEmitter = new phet.axon.Emitter();
    this.writeToEquation = function(text){
      this.mathField.write(text)
      

    }
    const domElement = parentDomElement; 
    this.domElement = options.dom;
    const mathField = window.MathQuill.getInterface(2).MathField(domElement, {
    
    // const mathField = MathQuill.getInterface(2).MathField(domElement, {
      handlers: {
        edit: function() {
          console.log("here");
          options.model[options.equation] = mathField.latex().replaceAll('\\theta',' t').replaceAll('\\omega',' o');
          // console.log(mathField.latex())
          options.model.validEqs = options.verifyEq(options.thetaElement,options.velocityElement, options.model);
          //post here
          // setTimeout(() => post(options.model.name, "changed " + options.equation, options.model.radiusProp.value, options.model.gravityProp.value, options.model.frictionProp.value, options.model.omegaProp.value, options.model.thetaProp.value, options.model.storeVel, options.model.velocityEQ, options.model.thetaEQ, options.model.id), 10)

        },
        

      }
    });
    // console.log("hereee",mathField)
    this.mathField = mathField;
    // console.log("mathfeild",this.mathField)
    mathField.write(options.initialText);

    const equationInputNode = new Node();
    this.equationInputNode = domElement;
    const domElementDOM = new phet.scenery.DOM( domElement, { allowInput: true } ) ;
    equationInputNode.addChild( domElementDOM);
    this.addChild(equationInputNode);
    

    domElement.addEventListener( 'keyup', event => {
      if ( event.code === phet.scenery.KeyboardUtils.KEY_ENTER ) {

        this.valueSubmittedEmitter.emit( mathField.latex() ); 

        mathField.blur();
      }
    } );


    this.domElement = domElement;
  }

  getElementValue() {
    return this.mathField.latex()
  }

  
}



