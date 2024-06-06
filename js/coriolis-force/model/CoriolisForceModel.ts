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

type SelfOptions = {
  //TODO add options that are specific to CoriolisForceModel here
};

type CoriolisForceModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class CoriolisForceModel implements TModel {

  public constructor( providedOptions: CoriolisForceModelOptions ) {
    //TODO
  }

  /**
   * Resets the model.
   */
  public reset(): void {
    //TODO
  }

  /**
   * Steps the model.
   * @param dt - time step, in seconds
   */
  public step( dt: number ): void {
    //TODO
  }
}

coriolisForce.register( 'CoriolisForceModel', CoriolisForceModel );