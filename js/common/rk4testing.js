
function derivsEval( y, dydt, g,k, m, omega,equations, coriolisEq) {
    try {
        dydt[0] = equations.xdot({ x: y[0], y: y[1], v_x: y[2], v_y: y[3],o:omega });
    } catch (err) {
        console.log("Error in xdot:", err);
    }

    try {
        dydt[1] = equations.ydot({ x: y[0], y: y[1], v_x: y[2], v_y: y[3],o:omega });
    } catch (err) {
        console.log("Error in ydot:", err);
    }

    try {
        dydt[2] = equations.v_xdot({ x: y[0], y: y[1], v_x: y[2], v_y: y[3],o:omega });
    } catch (err) {
        console.log("Error in v_xdot:", err);
    }

    try {
        dydt[3] = equations.v_ydot({ x: y[0], y: y[1], v_x: y[2], v_y: y[3],o:omega });
    } catch (err) {
        console.log("Error in v_ydot:", err);
    }

    return dydt;
}

function derivs(y, dydt, g, k, m, omega, coriolisEq) {
    if (coriolisEq) {
        // Equations of motion in the rotating frame (Coriolis)
        dydt[0] = y[2];
        dydt[1] = y[3];
        dydt[2] = 2 * omega * y[3] + (omega ** 2) * y[0];
        dydt[3] = -2 * omega * y[2] + (omega ** 2) * y[1] - g;
    } else {
        // Projectile motion with air resistance in inertial frame
        let speed = Math.sqrt(y[2] ** 2 + y[3] ** 2);
        dydt[0] = y[2];
        dydt[1] = y[3];
        dydt[2] = -(k / m) * y[2] * speed;
        dydt[3] = -g - (k / m) * y[3] * speed;
    }
    return dydt;
}

function rk4(y, h, g, k, m, omega, coriolisEq, equations, useEval) {
    const N = 4;
    let h6 = h / 6.0;
    let hh = h * 0.5;
    let dydx = new Array(N).fill(0);
    let yt = new Array(N).fill(0);
    let dyt = new Array(N).fill(0);
    let dym = new Array(N).fill(0);
    let ynew = new Array(N).fill(0);

    dydx = useEval? derivs(y, dydx, g, k, m, omega, coriolisEq):derivsEval( y, dydx, g,k, m, omega,equations, coriolisEq);

    for (let i = 0; i < N; i++) {
        yt[i] = y[i] + hh * dydx[i];
    }

    dyt = useEval ? derivs(yt, dyt, g, k, m, omega, coriolisEq):derivsEval( y, dyt, g,k, m, omega,equations, coriolisEq);
    for (let i = 0; i < N; i++) {
        yt[i] = y[i] + hh * dyt[i];
    }

    dym = useEval ? derivs(yt, dym, g, k, m, omega, coriolisEq):derivsEval( y, dym, g,k, m, omega,equations, coriolisEq);
    for (let i = 0; i < N; i++) {
        yt[i] = y[i] + h * dym[i];
        dym[i] += dyt[i];
    }

    dyt = useEval ? derivs(yt, dyt, g, k, m, omega, coriolisEq) :derivsEval( y, dyt, g,k, m, omega,equations, coriolisEq);

    for (let i = 0; i < N; i++) {
        ynew[i] = y[i] + h6 * (dydx[i] + dyt[i] + 2.0 * dym[i]);
    }

    return ynew;
}

function transformToInertial(x_r, y_r, vx_r, vy_r, theta, omega) {
    let x_i = x_r * Math.cos(theta) - y_r * Math.sin(theta);
    let y_i = x_r * Math.sin(theta) + y_r * Math.cos(theta);
    let vx_i = vx_r * Math.cos(theta) - vy_r * Math.sin(theta) - omega * y_i;
    let vy_i = vx_r * Math.sin(theta) + vy_r * Math.cos(theta) + omega * x_i;
    return [x_i, y_i, vx_i, vy_i];
}

function transformToRotating(x_i, y_i, vx_i, vy_i, theta, omega) {
    let x_r = x_i * Math.cos(theta) + y_i * Math.sin(theta);
    let y_r = -x_i * Math.sin(theta) + y_i * Math.cos(theta);
    let vx_r = (vx_i + omega * y_i) * Math.cos(theta) + (vy_i - omega * x_i) * Math.sin(theta);
    let vy_r = -(vx_i + omega * y_i) * Math.sin(theta) + (vy_i - omega * x_i) * Math.cos(theta);
    return [x_r, y_r, vx_r, vy_r];
}

function findDistance(x, y) {
    return Math.sqrt(x ** 2 + y ** 2);
}

function tv(omega) {
    return omega * 200;
}

export function getGraphData(drag, dt, xinit, yinit, xdot, ydot, g, k, m, omega, equations, useEval, graphLen, graphVals, time, coriolisEq) {
    let t = 0;
    let y = [xinit, yinit, xdot, ydot];
    let x_inertial_init, y_inertial_init, vx_inertial_init, vy_inertial_init;


    if (coriolisEq) {
        // Transform initial conditions to inertial frame for Coriolis case
        [x_inertial_init, y_inertial_init, vx_inertial_init, vy_inertial_init] = transformToInertial(xinit, yinit, xdot, ydot, 0, omega);
    }

    while (t < 10 && findDistance(y[0], y[1]) <= 200) {
        let theta = omega * t;
        let x_inertial, y_inertial, vx_inertial, vy_inertial, x_rotating, y_rotating;

        if (coriolisEq) {
            // For Coriolis: y contains rotating frame values
            [x_rotating, y_rotating] = [y[0], y[1]];
            
            // Calculate inertial frame position using initial velocity and time
            x_inertial = x_inertial_init + vx_inertial_init * t;
            y_inertial = y_inertial_init + vy_inertial_init * t - 0.5 * g * t * t;
            
            // Transform velocities to inertial frame
            [, , vx_inertial, vy_inertial] = transformToInertial(y[0], y[1], y[2], y[3], theta, omega);
        } else {
            // For projectile: y contains inertial frame values
            [x_inertial, y_inertial, vx_inertial, vy_inertial] = y;
            [x_rotating, y_rotating] = transformToRotating(x_inertial, y_inertial, vx_inertial, vy_inertial, theta, omega);
        }

        graphVals.insert(t, x_inertial, y_inertial, vx_inertial, vy_inertial, x_rotating, y_rotating, findDistance(x_inertial, y_inertial), tv(omega));
        
        y = rk4(y, dt, g, k, m, omega, coriolisEq, equations, useEval);
        t += dt;
    }

    return graphVals;
}