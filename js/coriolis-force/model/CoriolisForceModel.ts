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
import {getGraphData} from '../../common/rk4testing.js'

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

  public constructor( providedOptions: CoriolisForceModelOptions ) {
    this.k = 0;
    this.gravity = 9.8;
    this.x = 0;
    this.y = -200;
    this.v_x = 0;
    this.v_y = 100;
    this.omega = .5;
    this.mass = 1;
    this.timer = 0;
    this.quadraticDrag = true;
    this.graphLen = 5;
    this.originalLen = 0;
    this.graphUpdateInterval = .001;
    this.simSpeed = 1;

    this.kProp = new Property(this.k);
    this.xProp = new Property(this.x);
    this.yProp = new Property(this.y);
    this.v_xProp = new Property(this.v_x);
    this.v_yProp = new Property(this.v_y);
    this.omegaProp = new Property(this.omega);
    this.massProp = new Property(this.mass);
    this.graphData = new simData(this.graphUpdateInterval);
    this.simSpeedProp = new Property(this.simSpeed);
    console.log(this.graphData)
    this.graphData = getGraphData(this.quadraticDrag,this.graphUpdateInterval,this.x,this.y,this.v_x,this.v_y,this.gravity,this.k,this.mass,this.omega,{},false,this.graphLen,this.graphData,this.timer);
    console.log(this.y)

    

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


    this.graphData = getGraphData(this.quadraticDrag,this.graphUpdateInterval,this.x,this.y,this.v_x,this.v_y,this.gravity,this.k,this.mass,this.omega,{},false,this.graphLen,this.graphData,this.timer);

  }

  /**
   * Steps the model.
   * @param dt - time step, in seconds
   */
  public step( dt: number ): void {
    this.timer += dt*this.simSpeed;
    //TODO
  }
}

coriolisForce.register( 'CoriolisForceModel', CoriolisForceModel );