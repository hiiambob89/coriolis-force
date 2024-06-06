// Copyright 2024, University of Colorado Boulder

/**
 * Defines query parameters that are specific to this simulation.
 * Run with ?log to print query parameters and their values to the browser console at startup.
 *
 * @author Kaden Hart
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import coriolisForce from '../coriolisForce.js';

const SCHEMA_MAP = {
  //TODO add schemas for query parameters
};

const CoriolisForceQueryParameters = QueryStringMachine.getAll( SCHEMA_MAP );

// The schema map is a read-only part of the public API, in case schema details (e.g. validValues) are needed elsewhere.
CoriolisForceQueryParameters.SCHEMA_MAP = SCHEMA_MAP;

coriolisForce.register( 'CoriolisForceQueryParameters', CoriolisForceQueryParameters );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
logGlobal( 'phet.coriolisForce.CoriolisForceQueryParameters' );

export default CoriolisForceQueryParameters;