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

type SelfOptions = {
 //TODO add options that are specific to CoriolisForceScreenView here
};

type CoriolisForceScreenViewOptions = SelfOptions & ScreenViewOptions;

export default class CoriolisForceScreenView extends ScreenView {

  public constructor( model: CoriolisForceModel, providedOptions: CoriolisForceScreenViewOptions ) {

    const options = optionize<CoriolisForceScreenViewOptions, SelfOptions, ScreenViewOptions>()( {

      //TODO add default values for optional SelfOptions here

      //TODO add default values for optional ScreenViewOptions here
    }, providedOptions );

    super( options );

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput(); // cancel interactions that may be in progress
        model.reset();
        this.reset();
      },
      right: this.layoutBounds.maxX - CoriolisForceConstants.SCREEN_VIEW_X_MARGIN,
      bottom: this.layoutBounds.maxY - CoriolisForceConstants.SCREEN_VIEW_Y_MARGIN,
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );
  }

  /**
   * Resets the view.
   */
  public reset(): void {
    //TODO
  }

  /**
   * Steps the view.
   * @param dt - time step, in seconds
   */
  public override step( dt: number ): void {
    //TODO
  }
}

coriolisForce.register( 'CoriolisForceScreenView', CoriolisForceScreenView );