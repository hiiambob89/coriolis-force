// Copyright 2024, University of Colorado Boulder

/**
 * TODO Describe this class and its responsibilities.
 *
 * @author Kaden Hart
 */

import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import CoriolisForceConstants from '../../common/CoriolisForceConstants.js';
import coriolisForce from '../../coriolisForce.js';
import CoriolisForceModel from '../model/CoriolisForceModel.js';
import optionize from '../../../../phet-core/js/optionize.js';
import Panel from '../../../../sun/js/Panel.js';
import { Circle, Color, HBox, Rectangle, RichText, VBox } from '../../../../scenery/js/imports.js';
import Property from '../../../../axon/js/Property.js';
import HSlider from '../../../../sun/js/HSlider.js';
import EquationInput from './EquationInput.js';
import Range from '../../../../dot/js/Range.js';
import RoundToggleButton from '../../../../sun/js/buttons/RoundToggleButton.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { drawCoriolis, drawCen } from '../../common/makeGraphs.js';
import { verifyEq } from '../../common/verifyEq.js';
import { LineBasicMaterial } from 'c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index';
import ToggleSwitch from '../../../../sun/js/ToggleSwitch.js';


type SelfOptions = {
  //TODO add options that are specific to CoriolisForceScreenView here
};

type CoriolisForceScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class CoriolisForceScreenView extends ScreenView {
  domNode: any;
  disk: any;
  model: CoriolisForceModel;
  puckIRef: any;
  puckRefRef: any;
  diskRef: any;
  iOffset: number;
  refOffset: number;
  pathRefRef: any;
  lineRefRef: any;
  pathIRef: any;
  lineIRef: any;
  scene: any;
  rootNode: any;
  refDistanceCenterGraph: any;
  testDistanceCenterGraph: any;
  passedStart: boolean;
  refTangentialVelocityGraph: any;
  // testTangentialVelocityGraph: { node: any; x: any; y: any; };
  graphSize: number;
  focusedEq: any;
  yScaleD: any;
  xScaleD: any;
  yScaleTv: any;
  xScaleTv: any;
  puckITest: any;
  puckRefTest: any;
  pathRefTest: any;
  lineRefTest: any;
  pathITest: any;
  lineITest: any;
  refCenArrowDir: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").Vector3;
  refCenArrow: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").ArrowHelper;
  maxRefCen: any;
  maxRefCor: any;
  refCorArrowDir: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").Vector3;
  refCorArrow: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").ArrowHelper;
  refCorArrowDir2: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").Vector3;
  refCorArrow2: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").ArrowHelper;
  testCenArrowDir: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").Vector3;
  testCenArrow: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").ArrowHelper;
  maxTestCor: any;
  testCorArrowDir: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").Vector3;
  testCorArrow: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").ArrowHelper;
  maxTestCen: any;
  arrowGroup: import("c:/Users/kaden/phetsims/chipper/node_modules/@types/three/index").Group;

  public constructor(model: CoriolisForceModel, providedOptions: CoriolisForceScreenViewOptions) {

    const options = optionize<CoriolisForceScreenViewOptions, SelfOptions, ScreenViewOptions>()({

      //TODO add default values for optional SelfOptions here

      //TODO add default values for optional ScreenViewOptions here
    }, providedOptions);

    super(options);

    this.layoutBounds.maxX = 1400

    const resetAllButton = new ResetAllButton({
      listener: () => {
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
        model.reset();
        this.reset();
      },
      right: this.layoutBounds.maxX - CoriolisForceConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - CoriolisForceConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem('resetAllButton')
    });

    this.graphSize = this.layoutBounds.maxX / 7;

    const refDistanceCenterGraph = document.createElement('div');
    document.body.appendChild(refDistanceCenterGraph)
    const refTangentialVelocityGraph = document.createElement('div');
    document.body.appendChild(refTangentialVelocityGraph)
    const testDistanceCenterGraph = document.createElement('div');
    document.body.appendChild(testDistanceCenterGraph)
    const testTangentialVelocityGraph = document.createElement('div');
    document.body.appendChild(testTangentialVelocityGraph)

    this.rootNode = new phet.scenery.Node();
    const displayGraphs = new phet.scenery.Display(this.rootNode);
    displayGraphs.updateOnRequestAnimationFrame();
    displayGraphs.resizeOnWindowResize();
    document.body.appendChild(displayGraphs.domElement);

    refDistanceCenterGraph.id = 'staticSim-dist';
    this.refDistanceCenterGraph = drawCoriolis(model.graphData, model.graphLen, 'staticSim-dist', 'reference', this.graphSize, model.graphDataTest, model.graphLenTest);
    this.yScaleD = this.refDistanceCenterGraph.y
    this.xScaleD = this.refDistanceCenterGraph.x

    refTangentialVelocityGraph.id = 'staticSim-tv';
    this.refTangentialVelocityGraph = drawCen(model.graphData, model.graphLen, 'staticSim-tv', 'reference', this.graphSize, model.graphDataTest, model.graphLenTest);
    this.yScaleTv = this.refTangentialVelocityGraph.y
    this.xScaleTv = this.refTangentialVelocityGraph.x



    // refTangentialVelocityGraph.id = 'variableSim-distTest';
    // this.refTangentialVelocityGraph = drawCen(model.graphData, model.graphLen, 'variableSim-ydot', 'test', this.graphSize, model.graphDataTest, model.graphLenTest);
    // this.yScalevy = this.refYdotGraph.y
    // this.xScalevy = this.refYdotGraph.x
    // this.refYdotGraph = new phet.scenery.DOM(this.refYdotGraph.node);
    // this.addChild(this.refYdotGraph);

    // testDistanceCenterGraph.id = 'staticSim-x';
    // this.testDistanceCenterGraph = drawCoriolis(model.graphData, model.graphLen, 'staticSim-x', 'reference', this.graphSize, model.graphDataTest, model.graphLenTest);
    // this.yScalex = this.refXGraph.y
    // this.xScalex = this.refXGraph.x
    // this.refXGraph = new phet.scenery.DOM(this.refXGraph.node);
    // // this.addChild(this.refXGraph);

    // testTangentialVelocityGraph.id = 'variableSim-y';
    // this.testTangentialVelocityGraph = drawCen(model.graphData, model.graphLen, 'variableSim-y', 'test', this.graphSize, model.graphDataTest, model.graphLenTest);
    // this.yScaley = this.refYGraph.y
    // this.xScaley = this.refYGraph.x
    // this.refYGraph = new phet.scenery.DOM(this.refYGraph.node);





    this.refDistanceCenterGraph = new phet.scenery.DOM(this.refDistanceCenterGraph.node);
    this.refDistanceCenterGraph.element.children[9].setAttribute('cx', this.xScaleD(0));
    this.refDistanceCenterGraph.element.children[9].setAttribute('cy', this.yScaleD(model.graphData.getCor(0)));
    if (model.graphDataTest.data.length > 10) {
      this.refDistanceCenterGraph.element.children[7].setAttribute('cx', this.xScaleD(0));
      this.refDistanceCenterGraph.element.children[7].setAttribute('cy', this.yScaleD(model.graphDataTest.getCor(0)));
    }
    this.addChild(this.refDistanceCenterGraph)
    this.refDistanceCenterGraph.leftTop = new Vector2(1050, 50)

    this.refTangentialVelocityGraph = new phet.scenery.DOM(this.refTangentialVelocityGraph.node);
    this.refTangentialVelocityGraph.element.children[9].setAttribute('cx', this.xScaleTv(0));
    this.refTangentialVelocityGraph.element.children[9].setAttribute('cy', this.yScaleTv(model.graphData.getCen(0)));
    if (model.graphDataTest.data.length > 10) {
      this.refTangentialVelocityGraph.element.children[7].setAttribute('cx', this.xScaleTv(0));
      this.refTangentialVelocityGraph.element.children[7].setAttribute('cy', this.yScaleTv(model.graphDataTest.getCen(0)));
    }
    this.addChild(this.refTangentialVelocityGraph)
    this.refTangentialVelocityGraph.leftTop = new Vector2(1225, 50)



    const buttonMass = new Property<boolean>(false);
    const buttonFriction = new Property<boolean>(false);
    const buttonV_x = new Property<boolean>(false);
    const buttonV_y = new Property<boolean>(false);
    const buttonX = new Property<boolean>(false);
    const buttonY = new Property<boolean>(false);
    const buttonOmega = new Property<boolean>(false);

    const simSpeedSlider = new HSlider(model.simSpeedProp, new Range(0, Number(3)), { helpText: 'Simulation Speed' });
    const panelSizer = new Rectangle(10, 10, 200, 30);
    const sliderGap = new Rectangle(0, 0, 0, 10);

    const massSlider = new HSlider(model.massProp, new Range(0, 10));
    const mass = new RichText("<em>m</em>");
    const k = new RichText("<em>k</em>");
    const x = new RichText("<em>x<sub>0</sub></em>")
    const y = new RichText("<em>y<sub>0</sub></em>")
    const v_x = new RichText("<em>v<sub>0x</sub></em>");
    const v_y = new RichText("<em>v<sub>0y</sub></em>");
    const omega = new RichText("<em>Ω</em>")

    const constantNames = new VBox({
      align: "left", children: [
        // mass,
        // new Rectangle(0, 0, 0, massSlider.height - mass.height + 7),
        // k,
        // new Rectangle(0, 0, 0, massSlider.height - mass.height + 7),
        x,
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 7),
        y,
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 7),
        v_x,
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 7),
        v_y,
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 7),
        omega
      ]
    })
    // console.log("YYYYPROP", model.yProp.value)

    const constantSliders = new VBox({
      align: "center", children: [
        // massSlider,
        // new Rectangle(0, 0, 0, 10),
        // new HSlider(model.kProp, new Range(0, 10)),
        // new Rectangle(0, 0, 0, 10),
        new HSlider(model.xProp, new Range(-200, 200)),
        new Rectangle(0, 0, 0, 10),
        new HSlider(model.yProp, new Range(-200, 200)),
        new Rectangle(0, 0, 0, 10),
        new HSlider(model.v_xProp, new Range(0, 2000)),
        new Rectangle(0, 0, 0, 10),
        new HSlider(model.v_yProp, new Range(0, 2000)),
        new Rectangle(0, 0, 0, 10),
        new HSlider(model.omegaProp, new Range(0, 10)),
      ]
    })
    model.yProp.value = model.y;
    // console.log("YYYYPROP", model.yProp.value)

    var toggleRadius = 11;
    const buttonVBoxConstants = new VBox({
      children: [
        // new Rectangle(0, 0, 0, massSlider.height - mass.height),
        // new RoundToggleButton(buttonMass, false, true, { radius: toggleRadius }),
        // new RichText('✎'),

        // new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        // new RoundToggleButton(buttonFriction, false, true, { radius: toggleRadius }),
        // new RichText('✎'),

        // new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RoundToggleButton(buttonX, false, true, { radius: toggleRadius }),
        new RichText('✎'),

        new Rectangle(0, 0, 0, simSpeedSlider.height - mass.height + sliderGap.height),
        new RoundToggleButton(buttonY, false, true, { radius: toggleRadius }),
        new RichText('✎'),

        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RoundToggleButton(buttonV_x, false, true, { radius: toggleRadius }),
        new RichText('✎'),

        new Rectangle(0, 0, 0, simSpeedSlider.height - mass.height + sliderGap.height),
        new RoundToggleButton(buttonV_y, false, true, { radius: toggleRadius }),
        new RichText('✎'),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RoundToggleButton(buttonOmega, false, true, { radius: toggleRadius }),
        new RichText('✎'),


      ]
    })

    const constantMeasure = new VBox({
      align: "left", children: [
        new Rectangle(0, 0, 50, 0),
        // new phet.scenery.Text(new DerivedProperty([model.massProp], (value) => { return String(Number(value).toFixed(2)) }), { fontSize: 20 }),
        // new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        // new phet.scenery.Text(new DerivedProperty([model.kProp], (value) => { return String(Number(value).toFixed(2)) }), { fontSize: 20 }),

        // new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new phet.scenery.Text(new DerivedProperty([model.xProp], (value) => { return String(Number(value).toFixed(2)) }), { fontSize: 20 }),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new phet.scenery.Text(new DerivedProperty([model.yProp], (value) => { return String(Number(value).toFixed(2)) }), { fontSize: 20 }),

        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new phet.scenery.Text(new DerivedProperty([model.v_xProp], (value) => { return String(Number(value).toFixed(2)) }), { fontSize: 20 }),
        // new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new phet.scenery.Text(new DerivedProperty([model.v_yProp], (value) => { return String(Number(value).toFixed(2)) }), { fontSize: 20 }),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new phet.scenery.Text(new DerivedProperty([model.omegaProp], (value) => { return String(Number(value).toFixed(2)) }), { fontSize: 20 }),
      ]
    })

    const measureText = new VBox({
      align: "left", children: [
        // new RichText("<span style='font-family: Roman;'>kg</span>"),
        // new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        // new RichText("<span style='font-family: Roman;'>kg</span>"),
        // new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        // new RichText("<span style='font-family: Roman;'>1/m</span>"),
        // new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RichText("<span style='font-family: Roman;'>m</span>"),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RichText("<span style='font-family: Roman;'>m</span>"),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RichText("<span style='font-family: Roman;'>m/s</span>"),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RichText("<span style='font-family: Roman;'>m/s</span>"),
        new Rectangle(0, 0, 0, massSlider.height - mass.height + 10),
        new RichText("<span style='font-family: Roman;'>rot/s</span>"),
      ]
    })
    const constantPanel = new Panel(new VBox({
      align: "center", children: [new RichText("Constants"), new Rectangle(0, 0, 350, 15), new HBox({
        align: "center", children: [
          constantNames,
          new Rectangle(0, 0, 10, 0),
          constantSliders,
          new Rectangle(0, 0, 10, 0),
          buttonVBoxConstants,
          new Rectangle(0, 0, 10, 0),
          constantMeasure,
          new Rectangle(0, 0, 10, 0),
          measureText
        ]
      })]
    }), { fill: new Color("#d3d3d3"), maxWidth: 230 })



    const speedPanel = new Panel(new VBox({
      align: "center", children: [new RichText("Components"), new Rectangle(0, 0, 350, 20), new HBox({
        align: "center", children: [
          new RichText('simSpeed'), simSpeedSlider, new phet.scenery.Text(new DerivedProperty([model.simSpeedProp], (value) => { return String(Number(value).toFixed(2)) }), { fontSize: 20 }),
          new Rectangle(0, 0, 20, 50),
          resetAllButton
        ]
      })]
    }), { fill: new Color("#d3d3d3"), maxWidth: 230 })
    // const reset = () => {
    //   // model.reset()
    //   reset()
    // }
    window.addEventListener("keypress", (event) => {
      if (event.key == "r") {
        this.reset()
      }
    })

    // reset()

    const xdotDOM = document.createElement('span')
    const ydotDOM = document.createElement('span')
    const v_xdotDOM = document.createElement('span')
    const v_ydotDOM = document.createElement('span')
    xdotDOM.classList.add("my-mathquill-input");
    ydotDOM.classList.add("my-mathquill-input");
    v_xdotDOM.classList.add("my-mathquill-input");
    v_ydotDOM.classList.add("my-mathquill-input");

    const xdotField = new EquationInput(xdotDOM,
      {
        initialText: model.xEQ,
        model: model,
        equation: 'xEQ',
        verifyEq: verifyEq,
        dom: xdotDOM,
        focusedEq: this.focusedEq,
        xdotElement: xdotDOM,
        ydotElement: ydotDOM,
        v_ydotElement: v_ydotDOM,
        v_xdotElement: v_xdotDOM,
      }

    );


    const ydotField = new EquationInput(ydotDOM,
      {
        initialText: model.yEQ,
        model: model,
        equation: 'yEQ',
        verifyEq: verifyEq,
        dom: ydotDOM,
        focusedEq: this.focusedEq,
        xdotElement: xdotDOM,
        ydotElement: ydotDOM,
        v_ydotElement: v_ydotDOM,
        v_xdotElement: v_xdotDOM,
      }

    );

    const v_xdotField = new EquationInput(v_xdotDOM,
      {
        initialText: model.v_xEQ,
        model: model,
        equation: 'v_xEQ',
        verifyEq: verifyEq,
        dom: v_xdotDOM,
        focusedEq: this.focusedEq,
        xdotElement: xdotDOM,
        ydotElement: ydotDOM,
        v_ydotElement: v_ydotDOM,
        v_xdotElement: v_xdotDOM,
      }

    );

    const v_ydotField = new EquationInput(v_ydotDOM,
      {
        initialText: model.v_yEQ,
        model: model,
        equation: 'v_yEQ',
        verifyEq: verifyEq,
        dom: v_ydotDOM,
        focusedEq: this.focusedEq,
        xdotElement: xdotDOM,
        ydotElement: ydotDOM,
        v_ydotElement: v_ydotDOM,
        v_xdotElement: v_xdotDOM,
      }

    );
    this.focusedEq = [model.xEQ, xdotField, xdotField.writeToEquation];
    const focusedEq = [this.focusedEq]
    const xdotBox = new HBox({ preferredWidth: 30, children: [xdotField] })
    xdotBox.addInputListener({

      down: function (event) {
        xdotField.mathField.focus()
        focusedEq[0][0] = model.xEQ
        focusedEq[0][1] = xdotField
        // console.log('xdot detected')
      }
    })
    const ydotBox = new HBox({ preferredWidth: 30, children: [ydotField] })
    ydotBox.addInputListener({

      down: function (event) {
        ydotField.mathField.focus()
        focusedEq[0][0] = model.yEQ
        focusedEq[0][1] = ydotField
        // console.log('ydot detected')

      }
    })
    const v_xdotBox = new HBox({ preferredWidth: 30, children: [v_xdotField] })
    v_xdotBox.addInputListener({

      down: function (event) {
        v_xdotField.mathField.focus()
        focusedEq[0][0] = model.v_xEQ
        focusedEq[0][1] = v_xdotField
        // console.log('v_xdot detected')

      }
    })
    const v_ydotBox = new HBox({ preferredWidth: 30, children: [v_ydotField] })
    v_ydotBox.addInputListener({

      down: function (event) {
        v_ydotField.mathField.focus()
        focusedEq[0][0] = model.v_yEQ
        focusedEq[0][1] = v_ydotField
        // console.log('v_ydot detected')

      }
    })




    this.addChild(speedPanel);

    model.simSpeedProp.link((val) => model.simSpeed = val)
    this.addChild(constantPanel);

    var xdotPrime = document.createElement('span');    
    xdotPrime.innerHTML = '<span style="position: relative; font-family: sans-serif; font-style: italic;">x=<span style="position: absolute; top: -0.35em; left: 0.09em;">&middot;</span><span style="position: absolute; top: -0.3em; left: 0.55em; font-size: 0.9em;">′</span></span>';
    xdotPrime.style.fontSize = `${this.graphSize/9}px`
    const xdotPrimeDOM = new phet.scenery.DOM((xdotPrime));


    var ydotPrime = document.createElement('span');    
    ydotPrime.innerHTML = '<span style="position: relative; font-family: sans-serif; font-style: italic;">y=<span style="position: absolute; top: -0.35em; left: 0.09em;">&middot;</span><span style="position: absolute; top: -0.3em; left: 0.55em; font-size: 0.9em;">′</span></span>';
    ydotPrime.style.fontSize = `${this.graphSize/9}px`
    const ydotPrimeDOM = new phet.scenery.DOM((ydotPrime));

    var vxPrime = document.createElement('span');    
    vxPrime.innerHTML = '<span style="position: relative; font-family: sans-serif; font-style: italic;">v<sub>x</sub>=<span style="position: absolute; top: -0.3em; left: 0.55em; font-size: 0.9em;">′</span></span>';
    vxPrime.style.fontSize = `${this.graphSize/9}px`
    const vxPrimeDOM = new phet.scenery.DOM((vxPrime));

    var vyPrime = document.createElement('span');    
    vyPrime.innerHTML = '<span style="position: relative; font-family: sans-serif; font-style: italic;">v<sub>y</sub>=<span style="position: absolute; top: -0.3em; left: 0.55em; font-size: 0.9em;">′</span></span>';
    vyPrime.style.fontSize = `${this.graphSize/9}px`
    const vyPrimeDOM = new phet.scenery.DOM((vyPrime));

    var xdot = document.createElement('span');    
    xdot.innerHTML = '<span style="position: relative; font-family: sans-serif; font-style: italic;">x=<span style="position: absolute; top: -0.35em; left: 0.09em;">&middot;</span><span style="position: absolute; top: -0.3em; left: 0.55em; font-size: 0.9em;"></span></span>';
    xdot.style.fontSize = `${this.graphSize/9}px`
    const xdotlabelDOM = new phet.scenery.DOM((xdot));


    var ydot = document.createElement('span');    
    ydot.innerHTML = '<span style="position: relative; font-family: sans-serif; font-style: italic;">y=<span style="position: absolute; top: -0.35em; left: 0.09em;">&middot;</span><span style="position: absolute; top: -0.3em; left: 0.55em; font-size: 0.9em;"></span></span>';
    ydot.style.fontSize = `${this.graphSize/9}px`
    const ydotlabelDOM = new phet.scenery.DOM((ydot));

    var vx = document.createElement('span');    
    vx.innerHTML = '<span style="position: relative; font-family: sans-serif; font-style: italic;">v<sub>x</sub>=<span style="position: absolute; top: -0.3em; left: 0.55em; font-size: 0.9em;"></span></span>';
    vx.style.fontSize = `${this.graphSize/9}px`
    const vxlabelDOM = new phet.scenery.DOM((vx));

    var vy = document.createElement('span');    
    vy.innerHTML = '<span style="position: relative; font-family: sans-serif; font-style: italic;">v<sub>y</sub>=<span style="position: absolute; top: -0.3em; left: 0.55em; font-size: 0.9em;"></span></span>';
    vy.style.fontSize = `${this.graphSize/9}px`
    const vylabelDOM = new phet.scenery.DOM((vy));

    // const switchEquationProp = new Property<boolean>(model.coriolisEq);
    // const equationSwitch = new ToggleSwitch(switchEquationProp,true,false)
    const forceVectorToggle = new ToggleSwitch(model.showForceProp,true,false);
    model.showForceProp.lazyLink((e)=>model.showForceVectors=e)
    const trailVectorToggle = new ToggleSwitch(model.trailForceVectorsProp,true,false);
    model.trailForceVectorsProp.lazyLink((e)=>model.trailForceVectors=e)

    let equationPanel = 
    new Panel(new VBox({
      align: "center", children: [
        //eqation switch here
        new RichText("Test Equations"),
        new Rectangle(0, 0, 350, 15),
        // new HBox({align: "center", children: [new RichText("Coriolis Eq"),equationSwitch,new RichText("Projectile Eq")]}),
        new HBox({align: "center", children: [new RichText("Show Force Vectors?"),forceVectorToggle]}),
        new HBox({align: "center", children: [new RichText("Trail Force Vectors?"),trailVectorToggle]}),
        new HBox({ align: "center", children: [xdotPrimeDOM, xdotBox] }),
        new HBox({ children: [new Rectangle(0, 0, 0, 10)] }),
        new HBox({ align: "center", children: [ydotPrimeDOM, ydotBox] }),
        new HBox({ children: [new Rectangle(0, 0, 0, 10)] }),
        new HBox({ align: "center", children: [vxPrimeDOM, v_xdotBox] }),
        new HBox({ children: [new Rectangle(0, 0, 0, 10)] }),
        new HBox({ align: "center", children: [vyPrimeDOM, v_ydotBox] }),
      ]
    }), { fill: new Color("#d3d3d3"), maxWidth: 230 })
    
    // switchEquationProp.lazyLink(() => { model.coriolisEq = switchEquationProp.value; this.reset(); 
    //   if (model.coriolisEq){
      // equationPanel = new Panel(new VBox({
      //   align: "center", children: [
      //     //eqation switch here
      //     new RichText("Test Equations"),
      //     new Rectangle(0, 0, 350, 15),
      //     // new HBox({align: "center", children: [new RichText("Coriolis Eq"),equationSwitch,new RichText("Projectile Eq")]}),
      //     new HBox({ align: "center", children: [xdotPrimeDOM, xdotBox] }),
      //     new HBox({ children: [new Rectangle(0, 0, 0, 10)] }),
      //     new HBox({ align: "center", children: [ydotPrimeDOM, ydotBox] }),
      //     new HBox({ children: [new Rectangle(0, 0, 0, 10)] }),
      //     new HBox({ align: "center", children: [vxPrimeDOM, v_xdotBox] }),
      //     new HBox({ children: [new Rectangle(0, 0, 0, 10)] }),
      //     new HBox({ align: "center", children: [vyPrimeDOM, v_ydotBox] }),
      //   ]
      // }), { fill: new Color("#d3d3d3"), maxWidth: 230 })
    // } else{
      // equationPanel = new Panel(new VBox({
      //   align: "center", children: [
      //     //eqation switch here
      //     new RichText("Test Equations"),
      //     new Rectangle(0, 0, 350, 15),
      //     // new HBox({align: "center", children: [new RichText("Coriolis Eq"),equationSwitch,new RichText("Projectile Eq")]}),
      //     new HBox({ align: "center", children: [xdotlabelDOM, xdotBox] }),
      //     new HBox({ children: [new Rectangle(0, 0, 0, 10)] }),
      //     new HBox({ align: "center", children: [ydotlabelDOM, ydotBox] }),
      //     new HBox({ children: [new Rectangle(0, 0, 0, 10)] }),
      //     new HBox({ align: "center", children: [vxlabelDOM, v_xdotBox] }),
      //     new HBox({ children: [new Rectangle(0, 0, 0, 10)] }),
      //     new HBox({ align: "center", children: [vylabelDOM, v_ydotBox] }),
      //   ]
      // }), { fill: new Color("#d3d3d3"), maxWidth: 230 })
    // };console.log(model.coriolisEq);this.scene.remove(equationPanel);this.addChild(equationPanel);equationPanel.leftTop = new Vector2(0, constantPanel.rightBottom.y + 10)})



    this.addChild(equationPanel)
    equationPanel.leftTop = new Vector2(0, constantPanel.rightBottom.y + 10)
    // resetAllButton.leftTop = new Vector2(equationPanel.rightBottom.x - 50, equationPanel.rightBottom.y + 10)
    speedPanel.leftTop = new Vector2(equationPanel.leftBottom.x, equationPanel.leftBottom.y + 5)

    buttonMass.lazyLink(() => { model.massProp.value = Number(window.prompt("Enter value for mass:")); this.reset(); })
    buttonFriction.lazyLink(() => { model.kProp.value = Number(window.prompt("Enter value for k:")); this.reset(); })
    buttonX.lazyLink(() => { model.xProp.value = Number(window.prompt("Enter value for x:")); this.reset(); })
    buttonY.lazyLink(() => { model.yProp.value = Number(window.prompt("Enter value for y:")); this.reset(); })
    buttonV_x.lazyLink(() => { model.v_xProp.value = Number(window.prompt("Enter value for v_x:")); this.reset(); })
    buttonV_y.lazyLink(() => { model.v_yProp.value = Number(window.prompt("Enter value for v_y:")); this.reset(); })
    buttonOmega.lazyLink(() => { model.omegaProp.value = Number(window.prompt("Enter value for ω:")); this.reset(); })

    // Determining the balls for test and reference
    const redBall = new Circle(7, { fill: new Color("red") })
    const referenceBall = new RichText("Reference")
    this.addChild(redBall)
    this.addChild(referenceBall)
    redBall.leftTop = new phet.dot.Vector2(1100, 10)
    referenceBall.leftTop = new phet.dot.Vector2(1120, 5)

    const blueBall = new Circle(7, { fill: new Color("blue") })
    const testBall = new RichText("Test")
    this.addChild(blueBall)
    this.addChild(testBall)
    blueBall.leftTop = new phet.dot.Vector2(1250, 10)
    testBall.leftTop = new phet.dot.Vector2(1270, 5)



    this.model = model;
    // this.addChild(resetAllButton);
    this.iOffset = -200;
    this.refOffset = 200;

    const rootNode = new phet.scenery.Node();
    const display = new phet.scenery.Display(rootNode);
    document.body.appendChild(display.domElement);

    // set up a scene with three.js
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-this.layoutBounds.maxX / 2, this.layoutBounds.maxX / 2, -this.layoutBounds.maxY / 2, this.layoutBounds.maxY / 2);
    camera.position.set(0, 0, 0)
    camera.position.z = 1;
    const diskGeometry = new THREE.SphereGeometry(175, 32, 32);
    var iceMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('/coriolis-force/js/coriolis-force/view/6465863.jpg'),
      transparent: true,
      alphaTest: 0.5,
      side: THREE.DoubleSide
    });
    const disk = new THREE.Mesh(diskGeometry, iceMaterial);
    this.disk = disk;
    scene.add(disk);
    disk.position.set(this.iOffset, 0, 0);


    const rotationalFrame = new RichText("Rotating Frame")
    const inertialFrame = new RichText("Inertial Frame")

    rotationalFrame.leftTop = new Vector2(420, 60)
    inertialFrame.leftTop = new Vector2(850, 60)

    this.addChild(rotationalFrame)
    this.addChild(inertialFrame)





    const puckGeometry = new THREE.SphereGeometry(10, 32, 32);
    const puckMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, depthTest: true });
    const puckIRef = new THREE.Mesh(puckGeometry, puckMaterial);
    this.puckIRef = puckIRef;
    scene.add(puckIRef)
    puckIRef.position.set(this.iOffset + this.model.x, this.model.y, 0)

    const puckRefRef = new THREE.Mesh(puckGeometry, puckMaterial);
    this.puckRefRef = puckRefRef;
    scene.add(puckRefRef)
    puckRefRef.position.set(this.refOffset + this.model.x, this.model.y, 0)

    const puckTestMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, depthTest: true });
    const puckITest = new THREE.Mesh(puckGeometry, puckTestMaterial);
    this.puckITest = puckITest;
    if (model.xEQ !== "" && model.yEQ !== "" && model.v_xEQ !== "" && model.v_yEQ !== "") {

      scene.add(puckITest)
    }
    puckITest.position.set(this.iOffset + this.model.x, this.model.y, 0)

    const puckRefTest = new THREE.Mesh(puckGeometry, puckTestMaterial);
    this.puckRefTest = puckRefTest;
    if (model.xEQ !== "" && model.yEQ !== "" && model.v_xEQ !== "" && model.v_yEQ !== "") {

      // scene.add(puckITest)
      scene.add(puckRefTest)
    }
    puckRefTest.position.set(this.refOffset + this.model.x, this.model.y, 0)

    const diskRef = new THREE.Mesh(diskGeometry, iceMaterial);
    this.diskRef = diskRef;
    scene.add(diskRef);
    diskRef.position.set(this.refOffset, 0, 0)
    // this.reset()




    this.pathRefRef = new THREE.Path();
    this.pathRefRef.currentPoint = new THREE.Vector2(puckRefRef.position.x, puckRefRef.position.y)

    const points = [new THREE.Vector2(puckRefRef.position.x, puckRefRef.position.y)];

    const geometryPath = new THREE.BufferGeometry().setFromPoints(points);
    const materialPath = new THREE.LineBasicMaterial({ color: 0xff0000, transparent: true });

    this.lineRefRef = new THREE.Line(geometryPath, materialPath);

    scene.add(this.lineRefRef);

    this.pathIRef = new THREE.Path();
    this.pathIRef.currentPoint = new THREE.Vector2(puckIRef.position.x, puckIRef.position.y)

    const pointsI = [new THREE.Vector2(puckIRef.position.x, puckIRef.position.y)];

    const geometryPathI = new THREE.BufferGeometry().setFromPoints(pointsI);
    const materialPathI = new THREE.LineBasicMaterial({ color: 0xff0000, transparent: true });

    this.lineIRef = new THREE.Line(geometryPathI, materialPathI);

    scene.add(this.lineIRef);

    //Test path stuff
    this.pathRefTest = new THREE.Path();
    this.pathRefTest.currentPoint = new THREE.Vector2(puckRefTest.position.x, puckRefTest.position.y)
    const materialTestPath = new THREE.LineBasicMaterial({ color: 0x0000ff, transparent: true });

    this.lineRefTest = new THREE.Line(geometryPath, materialTestPath);

    // scene.add(this.lineRefTest);

    this.pathITest = new THREE.Path();
    this.pathITest.currentPoint = new THREE.Vector2(puckITest.position.x, puckITest.position.y)
    const materialTestPathI = new THREE.LineBasicMaterial({ color: 0x0000ff, transparent: true });

    this.lineITest = new THREE.Line(geometryPathI, materialTestPathI);

    this.maxRefCen =  d3.max(this.model.graphData.data, (d) => Math.abs(d.cen))
    this.refCenArrowDir = new THREE.Vector3( 0, 0, 0 );
    this.refCenArrowDir.normalize();

    const origin = puckIRef.position;
    const length = 50;
    const hex = 0xff0000;

    this.refCenArrow = new THREE.ArrowHelper( this.refCenArrowDir, puckIRef.position, 50, hex,10,20 );
    
    this.maxRefCor =  d3.max(this.model.graphData.data, (d) => Math.abs(d.cor))
    this.refCorArrowDir = new THREE.Vector3( 0, 0, 0 );
    this.refCorArrowDir.normalize();
    this.refCorArrow = new THREE.ArrowHelper( this.refCorArrowDir, origin, length, hex,10,20 );
    //////////////////////////////////////////////////////////////////
    this.maxTestCen =  d3.max(this.model.graphDataTest.data, (d) => Math.abs(d.cen))
    this.testCenArrowDir = new THREE.Vector3( 0, 0, 0 );
    this.testCenArrowDir.normalize();
    const originTest = puckIRef.position;
    this.testCenArrow = new THREE.ArrowHelper( this.testCenArrowDir, puckITest.position, 50, hex,10,20 );
    this.maxTestCor =  d3.max(this.model.graphDataTest.data, (d) => Math.abs(d.cor))
    this.testCorArrowDir = new THREE.Vector3( 0, 0, 0 );
    this.testCorArrowDir.normalize();
    this.testCorArrow = new THREE.ArrowHelper( this.testCorArrowDir, originTest, length, hex,10,20 );
    this.arrowGroup = new THREE.Group()
    this.arrowGroup.add( this.refCenArrow );
    this.arrowGroup.add( this.refCorArrow );
    this.arrowGroup.add( this.testCenArrow );
    this.arrowGroup.add( this.testCorArrow );
    scene.add(this.arrowGroup)
    this.scene = scene;

    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setClearAlpha(0);
    renderer.setSize(this.layoutBounds.maxX, this.layoutBounds.maxY);
    document.body.appendChild(renderer.domElement);

    const domNode = new phet.scenery.DOM(renderer.domElement);
    this.domNode = domNode;

    this.domNode._container.style.position = ""
    this.addChild(domNode);
    display.updateOnRequestAnimationFrame(() => {
      renderer.render(scene, camera);
    });
    this.passedStart = false
    const reset = () => {

      model.reset()
      this.reset()
    }
    reset()

  }
  yScalevx(arg0: any): any {
    throw new Error('Method not implemented.');
  }
  xScalevx(arg0: number): any {
    throw new Error('Method not implemented.');
  }

  /**
   * Resets the view.
   */
  public reset(): void {
    this.model.reset()
    this.scene.remove(this.arrowGroup)
    this.arrowGroup = new THREE.Group()
    this.scene.add(this.arrowGroup)
    // console.log(this.model.graphData)
    this.maxRefCen =  d3.max(this.model.graphData.data, (d) => Math.abs(d.cen))
    this.maxRefCor =  d3.max(this.model.graphData.data, (d) => Math.abs(d.cor))
    this.maxTestCen =  d3.max(this.model.graphDataTest.data, (d) => Math.abs(d.cen))
    this.maxTestCor =  d3.max(this.model.graphDataTest.data, (d) => Math.abs(d.cor))

    this.diskRef.rotation.z = 0;


    this.puckRefRef.position.x = this.refOffset + this.model.x
    this.puckRefRef.position.y = this.model.y*-1;
    this.puckIRef.position.x = this.iOffset + this.model.x
    this.puckIRef.position.y = this.model.y*-1;
    this.pathRefRef = new THREE.Path();
    this.pathRefRef.currentPoint = new THREE.Vector2(this.puckRefRef.position.x, this.puckRefRef.position.y)

    const points = [new THREE.Vector2(this.puckRefRef.position.x, this.puckRefRef.position.y)];

    const geometryPath = new THREE.BufferGeometry().setFromPoints(points);
    const materialPath = new THREE.LineBasicMaterial({ color: 0xff0000, transparent: true });
    this.scene.remove(this.lineRefRef);
    this.lineRefRef = new THREE.Line(geometryPath, materialPath);

    // this.scene.add(this.lineRefRef);

    this.pathIRef = new THREE.Path();
    this.pathIRef.currentPoint = new THREE.Vector2(this.puckIRef.position.x, this.puckIRef.position.y)

    const pointsI = [new THREE.Vector2(this.puckIRef.position.x, this.puckIRef.position.y)];

    const geometryPathI = new THREE.BufferGeometry().setFromPoints(pointsI);
    const materialPathI = new THREE.LineBasicMaterial({ color: 0xff0000, transparent: true });

    this.scene.remove(this.lineIRef);

    this.lineIRef = new THREE.Line(geometryPathI, materialPathI);
    if (this.model.xEQ !== "" && this.model.yEQ !== "" && this.model.v_xEQ !== "" && this.model.v_yEQ !== "") {

      this.scene.add(this.puckITest)
      this.scene.add(this.puckRefTest)
    } else {
      this.scene.remove(this.puckITest)
      this.scene.remove(this.puckRefTest)
    }

    // this.scene.add(this.lineIRef);
    //
    //
    //Test stuff
    this.puckRefTest.position.x = this.refOffset + this.model.x
    this.puckRefTest.position.y = this.model.y*-1;
    this.puckITest.position.x = this.iOffset + this.model.x
    this.puckITest.position.y = this.model.y*-1;
    this.pathRefTest = new THREE.Path();
    this.pathRefTest.currentPoint = new THREE.Vector2(this.puckRefTest.position.x, this.puckRefTest.position.y)

    const pointsTest = [new THREE.Vector2(this.puckRefTest.position.x, this.puckRefTest.position.y)];

    const geometryTestPath = new THREE.BufferGeometry().setFromPoints(pointsTest);
    const materialTestPath = new THREE.LineBasicMaterial({ color: 0x0000ff, transparent: true });
    this.scene.remove(this.lineRefTest);
    this.lineRefTest = new THREE.Line(geometryTestPath, materialTestPath);

    // this.scene.add(this.lineRefTest);

    this.pathITest = new THREE.Path();
    this.pathITest.currentPoint = new THREE.Vector2(this.puckITest.position.x, this.puckITest.position.y)

    const pointsITest = [new THREE.Vector2(this.puckITest.position.x, this.puckITest.position.y)];

    const geometryTestPathI = new THREE.BufferGeometry().setFromPoints(pointsITest);
    const materialTestPathI = new THREE.LineBasicMaterial({ color: 0x0000ff, transparent: true });

    this.scene.remove(this.lineITest);

    this.lineITest = new THREE.Line(geometryTestPathI, materialTestPathI);

    this.passedStart = false

    // Updating graphs

    this.refDistanceCenterGraph.detach();
    this.refDistanceCenterGraph = drawCoriolis(this.model.graphData, this.model.graphLen, 'staticSim-dist', 'reference', this.graphSize, this.model.graphDataTest, this.model.graphLenTest);
    this.yScaleD = this.refDistanceCenterGraph.y
    this.xScaleD = this.refDistanceCenterGraph.x
    this.refDistanceCenterGraph = new phet.scenery.DOM(this.refDistanceCenterGraph.node);
    this.refDistanceCenterGraph._container.style.transformOrigin = 'left top 0px';
    // this.addChild(this.refYdotGraph);

    this.refTangentialVelocityGraph.detach();
    this.refTangentialVelocityGraph = drawCen(this.model.graphData, this.model.graphLen, 'staticSim-tv', 'reference', this.graphSize, this.model.graphDataTest, this.model.graphLenTest);
    this.yScaleTv = this.refTangentialVelocityGraph.y
    this.xScaleTv = this.refTangentialVelocityGraph.x
    this.refTangentialVelocityGraph = new phet.scenery.DOM(this.refTangentialVelocityGraph.node);
    this.refTangentialVelocityGraph._container.style.transformOrigin = 'left top 0px';

    this.refTangentialVelocityGraph.leftTop = new Vector2(1225, 50)
    this.refDistanceCenterGraph.leftTop = new Vector2(1050, 50)


    this.addChild(this.refDistanceCenterGraph);
    this.addChild(this.refTangentialVelocityGraph);

    this.refDistanceCenterGraph.element.children[9].setAttribute('cx', this.xScaleD(0));
    this.refDistanceCenterGraph.element.children[9].setAttribute('cy', this.yScaleD(this.model.graphData.getCor(0)));
    if (this.model.graphDataTest.data.length > 10) {
      this.refDistanceCenterGraph.element.children[7].setAttribute('cx', this.xScaleD(0));
      this.refDistanceCenterGraph.element.children[7].setAttribute('cy', this.yScaleD(this.model.graphDataTest.getCor(0)));
    }
    this.refTangentialVelocityGraph.element.children[9].setAttribute('cx', this.xScaleTv(0));
    this.refTangentialVelocityGraph.element.children[9].setAttribute('cy', this.yScaleTv(this.model.graphData.getCen(0)));
    if (this.model.graphDataTest.data.length > 10) {
      this.refTangentialVelocityGraph.element.children[7].setAttribute('cx', this.xScaleTv(0));
      this.refTangentialVelocityGraph.element.children[7].setAttribute('cy', this.yScaleTv(this.model.graphDataTest.getCen(0)));
    }
  }


  public override step(dt: number): void {
      // console.log(dt)
      if (!document.hidden){
      this.model.timer+=dt;
    }
      if (this.model.timer <= 10 ) {
        // console.log(dt)
        if (this.model.trailForceVectors){
          if (this.model.frameCount %50 !==0){
            this.arrowGroup.remove(this.refCenArrow)
            this.arrowGroup.remove(this.refCorArrow)
            this.arrowGroup.remove(this.testCenArrow)
            this.arrowGroup.remove(this.testCorArrow)
          }
          this.model.frameCount++;
        }else{
          this.arrowGroup.remove(this.refCenArrow)
          this.arrowGroup.remove(this.refCorArrow)
          this.arrowGroup.remove(this.testCenArrow)
          this.arrowGroup.remove(this.testCorArrow)
        }
        
        this.refCenArrowDir = new THREE.Vector3(  this.puckIRef.position.x - this.disk.position.x , this.puckIRef.position.y - this.disk.position.y , 0 );
        let adjustedRefCenForce = Math.abs(this.model.graphData.getCen(this.model.timer)/this.maxRefCen)
        this.refCenArrowDir.normalize();
        const origin = this.puckIRef.position;
        const hex = 0xff00ff;
        this.refCenArrow = new THREE.ArrowHelper( this.refCenArrowDir, origin, adjustedRefCenForce*50, hex,adjustedRefCenForce*20,adjustedRefCenForce*10);
        this.refCorArrowDir = new THREE.Vector3( this.model.graphData.getV_Y(this.model.timer), this.model.graphData.getV_X(this.model.timer), 0 );
        this.refCorArrowDir.normalize();
        const magnitude = Math.abs(this.model.graphData.getCor(this.model.timer)/this.maxRefCor)
        this.refCorArrow = new THREE.ArrowHelper( this.refCorArrowDir, origin, magnitude*50, '#027320',magnitude*20,magnitude*10);
        this.refCorArrow.line.material = new THREE.LineDashedMaterial({
          color: '#027320',
          linewidth: 2,
          scale: 15,
          dashSize: 2,
          gapSize: 1,
      })
      this.refCorArrow.line.computeLineDistances()
        this.testCenArrowDir = new THREE.Vector3(  this.puckITest.position.x - this.disk.position.x , this.puckITest.position.y - this.disk.position.y , 0 );
        let adjustedTestCenForce = Math.abs(this.model.graphDataTest.getCen(this.model.timer)/this.maxTestCen)
        this.testCenArrowDir.normalize();
        const originTest = this.puckITest.position;
        // const hex = 0xff00ff;
        this.testCenArrow = new THREE.ArrowHelper( this.testCenArrowDir, originTest, adjustedTestCenForce*50, hex,adjustedTestCenForce*20,adjustedTestCenForce*10);
        this.testCorArrowDir = new THREE.Vector3( this.model.graphDataTest.getV_Y(this.model.timer), this.model.graphDataTest.getV_X(this.model.timer), 0 );
        this.testCorArrowDir.normalize();
        const magnitudeTest = Math.abs(this.model.graphDataTest.getCor(this.model.timer)/this.maxTestCor)
        this.testCorArrow = new THREE.ArrowHelper( this.testCorArrowDir, originTest, magnitudeTest*50, '#027320',magnitudeTest*20,magnitudeTest*10);
        this.testCorArrow.line.material = new THREE.LineDashedMaterial({
          color: '#027320',
          linewidth: 2,
          scale: 15,
          dashSize: 2,
          gapSize: 1,
      })
        if (this.model.showForceVectors){
          this.arrowGroup.add( this.refCorArrow );
          this.arrowGroup.add(this.refCenArrow);
          this.arrowGroup.add( this.testCorArrow );
          this.arrowGroup.add(this.testCenArrow);
  
        }
        const updatePuckAndPath = (testContinue?: boolean, refContinue?: boolean) => {
          if (Math.sqrt(this.model.graphData.getX(this.model.timer)**2 +this.model.graphData.getY(this.model.timer)**2)<= 165 ||  (Math.sqrt(this.model.graphDataTest.getX(this.model.timer)**2 +this.model.graphDataTest.getY(this.model.timer)**2)<= 165 && this.model.graphDataTest.data.length > 5)) {
          this.diskRef.rotateZ(dt  * this.model.omega * this.model.simSpeed *-1);
          }
          const bufferXRef = this.puckRefRef.position.x;
          const bufferYRef = this.puckRefRef.position.y ;
          const bufferXI = this.puckIRef.position.x;
          const bufferYI = this.puckIRef.position.y;
  
          const bufferXRefTest = this.puckRefTest.position.x;
          const bufferYRefTest = this.puckRefTest.position.y;
          const bufferXITest = this.puckITest.position.x;
          const bufferYITest = this.puckITest.position.y;
  
          if (this.model.graphDataTest.getX(this.model.timer) !== 0 && this.model.graphDataTest.getY(this.model.timer) !== 0) {
  
            this.puckITest.position.x = this.model.graphDataTest.getXI(this.model.timer) + this.iOffset;
            this.puckITest.position.y = this.model.graphDataTest.getYI(this.model.timer)*-1;
            this.pathITest.quadraticCurveTo(bufferXITest, bufferYITest, this.puckITest.position.x, this.puckITest.position.y);
  
            this.puckRefTest.position.x = this.model.graphDataTest.getX(this.model.timer) + this.refOffset;
            this.puckRefTest.position.y = this.model.graphDataTest.getY(this.model.timer)*-1;
            this.pathRefTest.quadraticCurveTo(bufferXRefTest, bufferYRefTest, this.puckRefTest.position.x, this.puckRefTest.position.y);
          }
          if (refContinue){
            this.puckIRef.position.x = this.model.graphData.getXI(this.model.timer) + this.iOffset;
            this.puckIRef.position.y = this.model.graphData.getYI(this.model.timer)*-1;
            this.pathIRef.quadraticCurveTo(bufferXI, bufferYI, this.puckIRef.position.x, this.puckIRef.position.y);
            // console.log(this.pathRefRef.)
    
            this.puckRefRef.position.x = this.model.graphData.getX(this.model.timer) + this.refOffset;
            this.puckRefRef.position.y = this.model.graphData.getY(this.model.timer)*-1;
            this.pathRefRef.quadraticCurveTo(bufferXRef, bufferYRef, this.puckRefRef.position.x, this.puckRefRef.position.y);
  
          }
  
          // Update geometries and lines
          const updateLine = (path, line, material) => {
            const points = path.getPoints();
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            this.scene.remove(line);
            line = new THREE.Line(geometry, material);
            line.computeLineDistances()
            // console.log(line.computeLineDistances())
            this.scene.add(line);
            return line;
          };
  
  
          const materialTestPath = new THREE.LineBasicMaterial({
            color: 0x0000ff,
  
            transparent: true
          });
  
          const materialPath = new THREE.LineDashedMaterial({
            color: 0xff0000,
            linewidth: 2,
            scale: 0.5,
            dashSize: 3,
            gapSize: 2,
            transparent: false
          });
          if (this.model.graphDataTest.getX(this.model.timer) !== 0 && this.model.graphDataTest.getY(this.model.timer) !== 0) {
            this.lineITest = updateLine(this.pathITest, this.lineITest, materialTestPath);
            this.lineRefTest = updateLine(this.pathRefTest, this.lineRefTest, materialTestPath);
          }
          if (refContinue){
            this.lineIRef = updateLine(this.pathIRef, this.lineIRef, materialPath);
            this.lineRefRef = updateLine(this.pathRefRef, this.lineRefRef, materialPath);
          }
        };
  
        // if (!this.passedStart) {
        //   updatePuckAndPath();
        //   this.passedStart = true;
        // } else 
        if (Math.sqrt(this.model.graphData.getX(this.model.timer)**2 +this.model.graphData.getY(this.model.timer)**2)<= 165 ) {
          this.refDistanceCenterGraph.element.children[9].setAttribute('cx', this.xScaleD(this.model.timer));
          this.refDistanceCenterGraph.element.children[9].setAttribute('cy', this.yScaleD(this.model.graphData.getCor(this.model.timer)));
          this.refTangentialVelocityGraph.element.children[9].setAttribute('cx', this.xScaleTv(this.model.timer));
          this.refTangentialVelocityGraph.element.children[9].setAttribute('cy', this.yScaleTv(this.model.graphData.getCen(this.model.timer)));
  
  
        }
        if (Math.sqrt(this.model.graphDataTest.getX(this.model.timer)**2 +this.model.graphDataTest.getY(this.model.timer)**2)<= 165 ) {
          if (this.model.xEQ !== "" && this.model.yEQ !== "" && this.model.v_xEQ !== "" && this.model.v_yEQ !== "") {
            this.refDistanceCenterGraph.element.children[7].setAttribute('cx', this.xScaleD(this.model.timer));
            this.refDistanceCenterGraph.element.children[7].setAttribute('cy', this.yScaleD(this.model.graphDataTest.getCor(this.model.timer)));
            this.refTangentialVelocityGraph.element.children[7].setAttribute('cx', this.xScaleTv(this.model.timer));
            this.refTangentialVelocityGraph.element.children[7].setAttribute('cy', this.yScaleTv(this.model.graphDataTest.getCen(this.model.timer)));
          }
  
  
        }
        updatePuckAndPath(true, true);
      }


  }


  
}


coriolisForce.register('CoriolisForceScreenView', CoriolisForceScreenView);