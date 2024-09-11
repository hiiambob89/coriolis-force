// Copyright 2024, University of Colorado Boulder

/**
 * TODO Describe this class and its responsibilities.
 *
 * @author Kaden Hart
 */

import coriolisForce from '../../coriolisForce.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import TModel from '../../../../joist/js/TModel.js';
import Property from '../../../../axon/js/Property.js';
import { simData } from '../../../../coriolis-force/js/common/simData.js';
import { getGraphData } from '../../common/rk4testing.js'

type SelfOptions = {
  //TODO add options that are specific to CoriolisForceModel here
};

type CoriolisForceModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class CoriolisForceModel implements TModel {
  k: number;
  x: number;
  y: number;
  v_x: number;
  v_y: number;
  omega: number;
  kProp: Property<number>;
  gravityProp: Property<number>;
  yProp: Property<number>;
  v_xProp: Property<number>;
  v_yProp: Property<number>;
  omegaProp: Property<number>;
  timer: number;
  quadraticDrag: boolean;
  mass: number;
  gravity: number;
  graphLen: number;
  originalLen: number;
  graphUpdateInterval: number;
  graphData: any;
  massProp: Property<number>;
  simSpeed: number;
  simSpeedProp: Property<number>;
  xProp: Property<number>;



  public xEQ: string;
  public yEQ: string;
  public v_xEQ: string;
  public v_yEQ: string;
  public xFunc;
  public yFunc;
  public v_xFunc;
  public v_yFunc;
  public graphData: simData;
  public graphDataTest: simData;
  public graphLen: number;
  public graphUpdateInterval: number;
  public graphLenTest: number;
  public prevX: number
  coriolisEq: boolean;

  public constructor(providedOptions: CoriolisForceModelOptions) {
    this.k = 0;
    this.gravity = 9.8;
    this.x = 0;
    this.y = 0;
    this.v_x = 400;
    this.v_y = 0;
    this.omega = .5;
    this.mass = 1;
    this.timer = 0;
    this.quadraticDrag = true;
    this.graphLen = 5;
    this.originalLen = 0;
    this.graphUpdateInterval = .001;
    this.simSpeed = .09;
    this.graphUpdateInterval = .001;
    this.coriolisEq = true;
    this.graphData = new simData(this.graphUpdateInterval)
    this.graphDataTest = new simData(this.graphUpdateInterval)

    this.kProp = new Property(this.k);
    this.xProp = new Property(this.x);
    this.yProp = new Property(this.y);
    this.v_xProp = new Property(this.v_x);
    this.v_yProp = new Property(this.v_y);
    this.omegaProp = new Property(this.omega);
    this.massProp = new Property(this.mass);
    this.graphData = new simData(this.graphUpdateInterval);
    this.simSpeedProp = new Property(this.simSpeed);
    this.graphData = getGraphData(this.quadraticDrag, this.graphUpdateInterval, this.x, this.y, this.v_x, this.v_y, this.gravity, this.k, this.mass, this.omega, {}, false, this.graphLen, this.graphData, this.timer,this.coriolisEq);
    console.log(this.graphData)
    // console.log(this.y)
    let prevX = this.x
    let prevY = -200
    // this.xProp.link((val) => {
    //   if (Math.sqrt(Math.pow(val - 200, 2) + Math.pow(this.yProp.value, 2)) <= 200) {
    //     prevX = val
    //     this.xProp.value = val
    //     this.x = val
    //   } else {
    //     this.xProp.value = prevX
    //     this.x = this.xProp.value
    //   }
    // });
    // this.yProp.link((val) => {
    //   if (Math.sqrt(Math.pow(this.xProp.value - 200, 2) + Math.pow(val, 2)) <= 200) {
    //     prevY = val
    //     this.yProp.value = val
    //     this.y = val
    //   } else {
    //     this.yProp.value = this.y
    //     this.y = this.yProp.value
    //   }
    // });
    





    if (new URL(window.location.href).searchParams.get("formula") === 'true') {
      this.xEQ = 'v_x'
      this.yEQ = 'v_y'
      this.v_xEQ = '-k\\cdot v_x\\cdot\\sqrt{v_x^2+v_y^2}'
      this.v_yEQ = '-g-k\\cdot v_y\\cdot\\sqrt{v_x^2+v_y^2}'
      // this.v_xEQ = '-\\frac{k}{m}\\cdot v_x\\cdot\\sqrt{v_x^2+v_y^2}'
      // this.v_yEQ = '-g-\\frac{k}{m}\\cdot v_y\\cdot\\sqrt{v_x^2+v_y^2}'

      this.xFunc = globalThis.window.evaluatex(this.xEQ, { k: this.k, m: this.mass, g: this.gravity, o:this.omega }, { latex: true });
      this.yFunc = globalThis.window.evaluatex(this.yEQ, { k: this.k, m: this.mass, g: this.gravity , o:this.omega}, { latex: true });
      this.v_xFunc = globalThis.window.evaluatex(this.v_xEQ, { k: this.k, m: this.mass, g: this.gravity , o:this.omega}, { latex: true });
      this.v_yFunc = globalThis.window.evaluatex(this.v_yEQ, { k: this.k, m: this.mass, g: this.gravity , o:this.omega}, { latex: true });
      
      this.graphDataTest = getGraphData(this.quadraticDrag, this.graphUpdateInterval, this.x, this.y, this.v_x, this.v_y, this.gravity, this.k, this.mass, this.omega, {v_xdot:this.v_xFunc,v_yFunc:this.v_yEQ,xdot:this.xFunc,ydot:this.yFunc}, true, this.graphLen, this.graphData, this.timer,this.coriolisEq);

    } else {
      this.xEQ = ''
      this.yEQ = ''
      this.v_xEQ = ''
      this.v_yEQ = ''
      this.graphDataTest = new simData(this.graphUpdateInterval)
      this.graphDataTest.insert(0, 0, 0, 0, 0, 0, 0)


    }

    this.graphData = getGraphData(this.quadraticDrag, this.graphUpdateInterval, this.x, this.y, this.v_x, this.v_y, this.gravity, this.k, this.mass, this.omega, {}, false, this.graphLen, this.graphData, this.timer);
    this.graphLen = this.graphData.data.length * this.graphUpdateInterval;
    this.graphLenTest = this.graphDataTest.data.length * this.graphUpdateInterval;

  }

  /**
   * Resets the model.
   */
  public reset(): void {
    console.log(this.y)
    console.log(this.yProp.value)
    this.k = this.kProp.value;
    this.x = this.xProp.value;
    this.y = this.yProp.value;
    this.v_x = this.v_xProp.value;
    this.v_y = this.v_yProp.value;
    this.omega = this.omegaProp.value;
    this.mass = this.massProp.value;
    this.timer = 0;
    this.quadraticDrag = true;
    this.graphLen = 5;
    this.originalLen = 0;
    this.graphUpdateInterval = .001;
    this.simSpeed = this.simSpeedProp.value;
    this.graphData = new simData(this.graphUpdateInterval);
    console.log(this.xEQ)
    console.log(this.yEQ)
    console.log(this.v_xEQ)
    console.log(this.v_yEQ)


    // this.graphDataTest = getGraphData(this.quadraticDrag, this.graphUpdateInterval, this.x, this.y, this.v_x, this.v_y, this.gravity, this.k, this.mass, this.omega, {v_xdot:this.v_xFunc,v_yFunc:this.v_yEQ,xdot:this.xFunc,ydot:this.yFunc}, true, this.graphLen, this.graphData, this.timer);
    // if (this.validEqs) {
    if (true) {
      if (this.xEQ === '' || this.yEQ === '' || this.v_xEQ === '' || this.v_yEQ === '') {
        this.graphDataTest = new simData(this.graphUpdateInterval)
        this.graphDataTest.insert(0,0,0,0,0,0,0)
      } else {
        // console.log('VYYY:',this.v_yEQ)
        this.xFunc = globalThis.window.evaluatex(this.xEQ, {k:this.k,m:this.mass,g:this.gravity, o:this.omega}, {latex:true});
        this.yFunc = globalThis.window.evaluatex(this.yEQ, {k:this.k,m:this.mass,g:this.gravity, o:this.omega}, {latex:true});
        this.v_xFunc = globalThis.window.evaluatex(this.v_xEQ, {k:this.k,m:this.mass,g:this.gravity, o:this.omega}, {latex:true});
        this.v_yFunc = globalThis.window.evaluatex(this.v_yEQ, {k:this.k,m:this.mass,g:this.gravity, o:this.omega}, {latex:true});
        // this.graphDataTest = getGraphData(this.quadraticDrag,this.graphUpdateInterval, this.x, this.y,this.y,angle, this.v_x, this.v_y, this.gravity, this.k,this.mass, {v_xdot:this.v_xFunc,v_ydot:this.v_yFunc,xdot:this.xFunc,ydot:this.yFunc}, true, this.graphLen, this.graphDataTest, this.timer);
        this.graphDataTest = new simData(this.graphUpdateInterval);
        
        this.graphDataTest = getGraphData(this.quadraticDrag, this.graphUpdateInterval, this.x, this.y, this.v_x, this.v_y, this.gravity, this.k, this.mass, this.omega, {v_xdot:this.v_xFunc,v_ydot:this.v_yFunc,xdot:this.xFunc,ydot:this.yFunc}, true, this.graphLen, this.graphDataTest, this.timer,this.coriolisEq);
      
      }

      
    } else {
      this.graphDataTest = new simData(this.graphUpdateInterval);
      this.graphDataTest.insert(0,0,0,0,0,0,0)
    }
    this.graphData = getGraphData(this.quadraticDrag, this.graphUpdateInterval, this.x, this.y, this.v_x, this.v_y, this.gravity, this.k, this.mass, this.omega, {}, false, this.graphLen, this.graphData, this.timer,this.coriolisEq);
    console.log(this.graphData)
    this.graphLenTest = this.graphDataTest.data.length * this.graphUpdateInterval;
    this.graphLen = this.graphData.data.length * this.graphUpdateInterval;

  }

  /**
   * Steps the model.
   * @param dt - time step, in seconds
   */
  public step(dt: number): void {
    this.timer += dt * this.simSpeed;
    //TODO
  }
}

coriolisForce.register('CoriolisForceModel', CoriolisForceModel);