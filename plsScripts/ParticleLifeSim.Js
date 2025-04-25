

var canvas = document.querySelector('canvas');
const width = 1810;
const height = 830;
const aspectRatio = width/height;
const screenWidth = window.innerWidth;
canvas.width = Math.min(width, screenWidth); 
canvas.height = canvas.width / aspectRatio; 
////////////////////////////////////////////
const screenHeight = window.innerHeight;
if (canvas.height > screenHeight) {
    canvas.height = screenHeight;
    canvas.width = canvas.height * aspectRatio; 
}
var ctx = canvas.getContext('2d');
//////////////////////////////////////////////////////////////////////////////////////
class Particle {
    constructor(position, color, velocity, radius, forceMatrix, forceColors)
    {
        this.cols = new Map();
        this.cols.set('red', 'rgba(255, 0, 0, 0.5)');
        this.cols.set('blue', 'rgba(0, 0, 255, 0.5)');
        this.cols.set('yellow', 'rgba(255, 255, 0, 0.5)');
        this.cols.set('green', 'rgba(0, 255, 0, 0.5)');


        this.position = position;
        this.colorName = color; // For force matrix lookup
        this.color = this.cols.get(color); // Visual color
        this.velocity = velocity;
        this.radius = radius;

        this.forceMatrix = forceMatrix; // Force interactions
        this.forceColors = forceColors; // Color lookup
    }

    getColor() {
        return this.color;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    calculateDistance(otherParticle) {
        const dx = this.position.x - otherParticle.position.x;
        const dy = this.position.y - otherParticle.position.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    getNeighbors(particles, searchRadius) {
        this.neighbors = [];
        particles.forEach(particle => {
            if (particle !== this) {
                const distance = this.calculateDistance(particle);
                if (distance <= searchRadius) {
                    this.neighbors.push({ particle, distance });
                }
            }
        });
    }

    applyForce(neighbor, distance, forceMultiplier, searchRadius) {
        const dx = this.position.x - neighbor.position.x;
        const dy = this.position.y - neighbor.position.y;
    
        const magnitude = Math.sqrt(dx * dx + dy * dy) || 0.00005; // Avoid division by zero
        const normDx = dx / magnitude;
        const normDy = dy / magnitude;
    
        // Check for overlap and apply repelling force if particles are too close
        const minDistance = this.radius *1.23 + neighbor.radius*1.23;
        const attractionThreshold = searchRadius * .85; // Attraction force taper off after this distance Math.abs(forceMultiplier)

        if (distance < minDistance) {
            const overlap = minDistance - distance;
    
            const repelFactor = -forceMultiplier * 1.5; // Adjust for the strength of repelling force
            this.velocity.dx += normDx * overlap * repelFactor;
            this.velocity.dy += normDy * overlap * repelFactor;
        } 
        else if (distance < attractionThreshold) {
            // Attraction force when particles are within a valid range but not too close
            const attractionFactor = .5 * forceMultiplier; // Adjust for weaker attraction
            const taper = 1 - (distance / attractionThreshold); // Reduce attraction with distance
            const adjustedForce = attractionFactor * taper;
    
            this.velocity.dx += normDx * adjustedForce;
            this.velocity.dy += normDy * adjustedForce;
        }
        /*
        else 
        {
            // Taper force based on distance (linear taper example)
            const taper = Math.exp(-distance / searchRadius); // Exponential decay for more gradual forces
            const adjustedForce = forceMultiplier * taper;
            
            this.velocity.dx += normDx * adjustedForce;
            this.velocity.dy += normDy * adjustedForce;
        }
        */

    }
    
    update(particles, searchRadius, maxSpeed) {
        this.getNeighbors(particles, searchRadius);
    
        this.neighbors.forEach(({ particle: neighbor, distance }) => {
            const sourceIndex = this.forceColors.indexOf(this.colorName);
            const targetIndex = this.forceColors.indexOf(neighbor.colorName);
    
            if (sourceIndex !== -1 && targetIndex !== -1) {
                const forceMultiplier = this.forceMatrix[sourceIndex][targetIndex];
                this.applyForce(neighbor, distance, forceMultiplier, searchRadius);
            }
        });
    
        // Limit velocity to maxSpeed
        const speed = Math.sqrt(this.velocity.dx ** 2 + this.velocity.dy ** 2);
        if (speed > maxSpeed) {
            const scale = maxSpeed / speed;
            this.velocity.dx *= scale;
            this.velocity.dy *= scale;
        }
    
        // Update particle position
        this.position.x += this.velocity.dx / 1.25;
        this.position.y += this.velocity.dy / 1.25;
    }
    
}
//////////////////////////////////////////////////////////////////////////////////////



const forceColors = ['red', 'yellow', 'blue', 'green'];
const forceMatrix = [
    [-.051, -1.20, 1.5, 10.51],   // Red interactions
    [1.25, -.051, -.015, 10.075],   // Yellow interactions
    [-1, -1, 2.5, 10.025],       // Blue interactions
    [0.0, 0.0, 0.0, 0.00]        // Green interactions

    //Add search radius to specific colors for more interesting/dynimic behavior between particles
];

// Initialize the particle system
const particles = [];
const numParticles = 1000;


const colArray = ['red', 'yellow', 'green','blue'];
//const amountArray = [.4,.4,.05,.15];

function generateRandomAmounts(size) {
    const amounts = Array(size).fill(0).map(() => Math.random()); // Create an array of random numbers
    const sum = amounts.reduce((acc, val) => acc + val, 0); // Calculate the sum of all random numbers
    return amounts.map(val => val / sum); // Normalize so that the sum equals 1
}

// Example usage
const numColors = 4; // Number of desired colors
const amountArray = generateRandomAmounts(numColors);

for (let i = 0; i < numParticles; i++) {

        // Randomly assign a color based on the amountArray distribution
        let randomValue = Math.random();
        let cumulative = 0;
        let color;
    
        for (let j = 0; j < amountArray.length; j++) {
            cumulative += amountArray[j];
            if (randomValue <= cumulative) {
                color = colArray[j];
                break;
            }
        }

    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const position = { x, y };
    const dx = 0;
    const dy = 0;
    const velocity = { dx, dy };
    //const color = colArray[Math.floor(Math.random() * colArray.length)];
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    
    const baseRadius = Math.min(canvasWidth, canvasHeight) * 0.0075; // Adjust scaling factor
    const radius = Math.random() * baseRadius * 0.25 + baseRadius * 0.25;

    particles.push(new Particle(position, color, velocity, radius, forceMatrix, forceColors));
}

// Animation loop
const maxSpeed = .75; // Cap velocity
const searchRadius = 35; // Interaction range

function drawParticles() {
    ctx.fillStyle = "rgba(5, 0, 15, 0.5)"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.draw(ctx);
        particle.update(particles, searchRadius, maxSpeed);

        // Handle edge wrapping
        if (particle.position.x + particle.radius > canvas.width) {
            particle.position.x = 0 + particle.radius;
        }
        if (particle.position.x - particle.radius < 0) {
            particle.position.x = canvas.width - particle.radius;
        }
        if (particle.position.y + particle.radius > canvas.height) {
            particle.position.y = 0 + particle.radius;
        }
        if (particle.position.y - particle.radius < 0) {
            particle.position.y = canvas.height - particle.radius;
        }
    });

    requestAnimationFrame(drawParticles);
}

drawParticles();





////////////////////////////////////////////////////////////////////////
/* class Particle
{
    constructor(position, color, velocity, radius) 
    {
        this.cols = new Map();
        this.cols.set('red','rgba(255, 0, 0, 0.5)');
        this.cols.set('blue','rgba(0, 0, 255, 0.5)');
        this.cols.set('yellow','rgba(255, 255, 0, 0.5)');
        this.cols.set( 'green', 'rgba(0, 255, 0, 0.5)');


        this.position = position;
        this.color = this.cols.get(color);
        this.velocity = velocity;
        //this.neighbors = [];  
    } 
    getColor()
    {
        return this.color;
    }
    draw(ctx)
    {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    calculateDistance(otherParticle) {
        const dx = this.position.x+this.radius  - otherParticle.position.x + otherParticle.radius;
        const dy = this.position.y+this.radius - otherParticle.position.y + otherParticle.radius;
        return Math.sqrt(dx * dx + dy * dy); 
    }
    getNeighbors(particles, searchRadius) {
        this.neighbors = [];  // Reset the neighbors array before adding new ones
        particles.forEach(particle => { /// add quad tree here!
            if (particle !== this ) {
                const distance = this.calculateDistance(particle);
                if (distance <= searchRadius) {
                    this.neighbors.push(particle);  // Add particle to neighbors list
                }
            }
        });
    }
    update(particles, searchRadius) {
        this.getNeighbors(particles, searchRadius);

        for (let i = 0; i < this.neighbors.length; i++) 
            {
            let neighbor = this.neighbors[i];

            if (neighbor.color === this.cols.get('red') && this.color !== this.cols.get('red') && this.color !== this.cols.get('yellow')) {
                const dx = this.position.x - neighbor.position.x; 
                const dy = this.position.y - neighbor.position.y;

                const magnitude = Math.sqrt(dx * dx + dy * dy);
                const normDx = dx / magnitude;
                const normDy = dy / magnitude;

                this.velocity.dx += normDx * 0.05; 
                this.velocity.dy += normDy * 0.05;
            }
            else if (neighbor.color === this.cols.get('red') && this.color === this.cols.get('red'))
            {
                const dx = this.position.x - neighbor.position.x; 
                const dy = this.position.y - neighbor.position.y;

                const magnitude = Math.sqrt(dx * dx + dy * dy);
                const normDx = dx / magnitude;
                const normDy = dy / magnitude;

                this.velocity.dx -= normDx * 0.0025; 
                this.velocity.dy -= normDy * 0.0025;
            }
            else if (neighbor.color === this.cols.get('red') && this.color === this.cols.get('yellow'))
            {
                const dx = this.position.x - neighbor.position.x; 
                const dy = this.position.y - neighbor.position.y;

                const magnitude = Math.sqrt(dx * dx + dy * dy);
                const normDx = dx / magnitude;
                const normDy = dy / magnitude;

                this.velocity.dx -= normDx * 0.005; 
                this.velocity.dy -= normDy * 0.005;
            }
        }
        this.position.x += this.velocity.dx;
        this.position.y += this.velocity.dy;
    }
}


const particles = [];
const numParticles = 50;
const colArray = ["red","yellow"];
//const colArray = ["red", "blue", "yellow","green"];

for (let i = 0; i < numParticles; i++) {
    // defines all particle variables to go into constructor.
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    const position = {x,y};
    const dx = 0;
    const dy = 0;
    const velocity ={dx,dy};
    const color = colArray[Math.floor(Math.random() * colArray.length)];
    const radius = Math.floor(Math.random() * 2) + 2.5;

    particles.push(new Particle(position, color, velocity, radius))
}

drawParticles();
function drawParticles() {
    ctx.fillStyle = "rgba(5, 0, 15, 0.5)"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.draw(ctx);
        particle.update(particles, 10);

        if (particle.position.x + particle.radius > canvas.width) 
        {
            particle.position.x = 0 + particle.radius;
        }   
        if  (particle.position.x - particle.radius < 0) 
        {
            particle.position.x = canvas.width - particle.radius;
        }
        if (particle.position.y + particle.radius > canvas.height) 
        {
            particle.position.y = 0 + particle.radius;
        }   
        if  (particle.position.y - particle.radius < 0) 
        {
            particle.position.y = canvas.height - particle.radius;
        }
    });

    requestAnimationFrame(drawParticles);
} */



/*var canvas = document.querySelector('canvas');
const width = 1810;
const height = 830;
const aspectRatio = width/height;
const screenWidth = window.innerWidth;
canvas.width = Math.min(width, screenWidth); 
canvas.height = canvas.width / aspectRatio; 
////////////////////////////////////////////
const screenHeight = window.innerHeight;
if (canvas.height > screenHeight) {
    canvas.height = screenHeight;
    canvas.width = canvas.height * aspectRatio; 
}
var ctx = canvas.getContext('2d');
//////////////////////////////////////////////////////////////////////////////////////
class Particle {
    constructor(position, color, velocity, radius, forceMatrix, forceColors)
    {
        this.cols = new Map();
        this.cols.set('red', 'rgba(255, 0, 0, 0.5)');
        this.cols.set('blue', 'rgba(0, 0, 255, 0.5)');
        this.cols.set('yellow', 'rgba(255, 255, 0, 0.5)');
        this.cols.set('green', 'rgba(0, 255, 0, 0.5)');
        this.cols.set('purple', 'rgba(150, 0, 150, 0.5)');

        this.position = position;
        this.colorName = color; // For force matrix lookup
        this.color = this.cols.get(color); // Visual color
        this.velocity = velocity;
        this.radius = radius;

        this.forceMatrix = forceMatrix; // Force interactions
        this.forceColors = forceColors; // Color lookup
    }

    getColor() {
        return this.color;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    calculateDistance(otherParticle) {
        const dx = this.position.x - otherParticle.position.x;
        const dy = this.position.y - otherParticle.position.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    getNeighbors(particles, searchRadius) {
        this.neighbors = [];
        particles.forEach(particle => {
            if (particle !== this) {
                const distance = this.calculateDistance(particle);
                if (distance <= searchRadius) {
                    this.neighbors.push({ particle, distance });
                }
            }
        });
    }

    applyForce(neighbor, distance, forceMultiplier, searchRadius) {
        const dx = this.position.x - neighbor.position.x;
        const dy = this.position.y - neighbor.position.y;
    
        const magnitude = Math.sqrt(dx * dx + dy * dy) || 0.00005; // Avoid division by zero
        const normDx = dx / magnitude;
        const normDy = dy / magnitude;
    
        // Check for overlap and apply repelling force if particles are too close
        const minDistance = this.radius *1.5 + neighbor.radius*1.5;
        const attractionThreshold = searchRadius * .55; // Attraction force taper off after this distance Math.abs(forceMultiplier)

        if (distance < minDistance) {
            const overlap = minDistance - distance;
    
            const repelFactor = -forceMultiplier * 10.5; // Adjust for the strength of repelling force
            this.velocity.dx += normDx * overlap * repelFactor;
            this.velocity.dy += normDy * overlap * repelFactor;
        } 
        else if (distance < attractionThreshold) {
            // Attraction force when particles are within a valid range but not too close
            const attractionFactor = .5 * forceMultiplier; // Adjust for weaker attraction
            const taper = 1 - (distance / attractionThreshold); // Reduce attraction with distance
            const adjustedForce = attractionFactor * taper;
    
            this.velocity.dx += normDx * adjustedForce;
            this.velocity.dy += normDy * adjustedForce;
        }
        /*
        else 
        {
            // Taper force based on distance (linear taper example)
            const taper = Math.exp(-distance / searchRadius); // Exponential decay for more gradual forces
            const adjustedForce = forceMultiplier * taper;
            
            this.velocity.dx += normDx * adjustedForce;
            this.velocity.dy += normDy * adjustedForce;
        }
        */

   /* }
    
    update(particles, searchRadius, maxSpeed) {
        this.getNeighbors(particles, searchRadius);
    
        this.neighbors.forEach(({ particle: neighbor, distance }) => {
            const sourceIndex = this.forceColors.indexOf(this.colorName);
            const targetIndex = this.forceColors.indexOf(neighbor.colorName);
    
            if (sourceIndex !== -1 && targetIndex !== -1) {
                const forceMultiplier = this.forceMatrix[sourceIndex][targetIndex];
                this.applyForce(neighbor, distance, forceMultiplier, searchRadius);
            }
        });
    
        // Limit velocity to maxSpeed
        const speed = Math.sqrt(this.velocity.dx ** 2 + this.velocity.dy ** 2);
        if (speed > maxSpeed) {
            const scale = maxSpeed / speed;
            this.velocity.dx *= scale;
            this.velocity.dy *= scale;
        }
    
        // Update particle position
        this.position.x += this.velocity.dx / 1.3;
        this.position.y += this.velocity.dy / 1.3;
    }
    
}
//////////////////////////////////////////////////////////////////////////////////////



const forceColors = ['red', 'yellow', 'blue', 'green', 'purple'];
const forceMatrix = [
    [.035, -1.20, 1.5, 10.51,-.51],   // Red interactions
    [1.25, -.051, -.015, 10.075,.51],   // Yellow interactions
    [-1, -1, 2.5, 10.025,.51],       // Blue interactions
    [0.0, 0.0, 0.0, 0.0,0],       // Green interactions
    [.05, .05, -.5, -.00075, -.0025]    // purple interactions
    //Add search radius to specific colors for more interesting/dynimic behavior between particles
];

// Initialize the particle system
const particles = [];
const numParticles = 1000;
//const colArray = ['red', 'yellow', 'green','blue', 'purple'];
//const amountArray = [.5,.15,.05,.15,.15];
const colArray = ['red', 'yellow', 'green','blue'];
const amountArray = [.7,.1,.05,.1,];
/*
function generateRandomAmounts(size) {
    const amounts = Array(size).fill(0).map(() => Math.random()); // Create an array of random numbers
    const sum = amounts.reduce((acc, val) => acc + val, 0); // Calculate the sum of all random numbers
    return amounts.map(val => val / sum); // Normalize so that the sum equals 1
}*/

// Example usage
/*const numColors = 4; // Number of desired colors
//const amountArray = generateRandomAmounts(numColors);

for (let i = 0; i < numParticles; i++) {

        // Randomly assign a color based on the amountArray distribution
        let randomValue = Math.random();
        let cumulative = 0;
        let color;
    
        for (let j = 0; j < amountArray.length; j++) {
            cumulative += amountArray[j];
            if (randomValue <= cumulative) {
                color = colArray[j];
                break;
            }
        }

    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const position = { x, y };
    const dx = 0;
    const dy = 0;
    const velocity = { dx, dy };
    //const color = colArray[Math.floor(Math.random() * colArray.length)];
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    
    const baseRadius = Math.min(canvasWidth, canvasHeight) * 0.0075; // Adjust scaling factor
    const radius =  baseRadius * 0.25 + baseRadius * .1;//Math.random() * baseRadius * 0.25 + baseRadius * 0.25;

    particles.push(new Particle(position, color, velocity, radius, forceMatrix, forceColors));
}

// Animation loop
const maxSpeed = .75; // Cap velocity
const searchRadius = 35; // Interaction range

function drawParticles() {
    ctx.fillStyle = "rgba(5, 0, 15, 0.5)"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.draw(ctx);
        particle.update(particles, searchRadius, maxSpeed);

        // Handle edge wrapping
        if (particle.position.x + particle.radius > canvas.width) {
            particle.position.x = 0 + particle.radius;
        }
        if (particle.position.x - particle.radius < 0) {
            particle.position.x = canvas.width - particle.radius;
        }
        if (particle.position.y + particle.radius > canvas.height) {
            particle.position.y = 0 + particle.radius;
        }
        if (particle.position.y - particle.radius < 0) {
            particle.position.y = canvas.height - particle.radius;
        }
    });

    requestAnimationFrame(drawParticles);
}

drawParticles();*/


/////////////////////////////////////////////////////////////////////////////////////////////



/* class Particle
{
    constructor(position, color, velocity, radius) 
    {
        this.cols = new Map();
        this.cols.set('red','rgba(255, 0, 0, 0.5)');
        this.cols.set('blue','rgba(0, 0, 255, 0.5)');
        this.cols.set('yellow','rgba(255, 255, 0, 0.5)');
        this.cols.set( 'green', 'rgba(0, 255, 0, 0.5)');


        this.position = position;
        this.color = this.cols.get(color);
        this.velocity = velocity;
        //this.neighbors = [];  
    } 
    getColor()
    {
        return this.color;
    }
    draw(ctx)
    {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    calculateDistance(otherParticle) {
        const dx = this.position.x+this.radius  - otherParticle.position.x + otherParticle.radius;
        const dy = this.position.y+this.radius - otherParticle.position.y + otherParticle.radius;
        return Math.sqrt(dx * dx + dy * dy); 
    }
    getNeighbors(particles, searchRadius) {
        this.neighbors = [];  // Reset the neighbors array before adding new ones
        particles.forEach(particle => { /// add quad tree here!
            if (particle !== this ) {
                const distance = this.calculateDistance(particle);
                if (distance <= searchRadius) {
                    this.neighbors.push(particle);  // Add particle to neighbors list
                }
            }
        });
    }
    update(particles, searchRadius) {
        this.getNeighbors(particles, searchRadius);

        for (let i = 0; i < this.neighbors.length; i++) 
            {
            let neighbor = this.neighbors[i];

            if (neighbor.color === this.cols.get('red') && this.color !== this.cols.get('red') && this.color !== this.cols.get('yellow')) {
                const dx = this.position.x - neighbor.position.x; 
                const dy = this.position.y - neighbor.position.y;

                const magnitude = Math.sqrt(dx * dx + dy * dy);
                const normDx = dx / magnitude;
                const normDy = dy / magnitude;

                this.velocity.dx += normDx * 0.05; 
                this.velocity.dy += normDy * 0.05;
            }
            else if (neighbor.color === this.cols.get('red') && this.color === this.cols.get('red'))
            {
                const dx = this.position.x - neighbor.position.x; 
                const dy = this.position.y - neighbor.position.y;

                const magnitude = Math.sqrt(dx * dx + dy * dy);
                const normDx = dx / magnitude;
                const normDy = dy / magnitude;

                this.velocity.dx -= normDx * 0.0025; 
                this.velocity.dy -= normDy * 0.0025;
            }
            else if (neighbor.color === this.cols.get('red') && this.color === this.cols.get('yellow'))
            {
                const dx = this.position.x - neighbor.position.x; 
                const dy = this.position.y - neighbor.position.y;

                const magnitude = Math.sqrt(dx * dx + dy * dy);
                const normDx = dx / magnitude;
                const normDy = dy / magnitude;

                this.velocity.dx -= normDx * 0.005; 
                this.velocity.dy -= normDy * 0.005;
            }
        }
        this.position.x += this.velocity.dx;
        this.position.y += this.velocity.dy;
    }
}


const particles = [];
const numParticles = 50;
const colArray = ["red","yellow"];
//const colArray = ["red", "blue", "yellow","green"];

for (let i = 0; i < numParticles; i++) {
    // defines all particle variables to go into constructor.
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    const position = {x,y};
    const dx = 0;
    const dy = 0;
    const velocity ={dx,dy};
    const color = colArray[Math.floor(Math.random() * colArray.length)];
    const radius = Math.floor(Math.random() * 2) + 2.5;

    particles.push(new Particle(position, color, velocity, radius))
}

drawParticles();
function drawParticles() {
    ctx.fillStyle = "rgba(5, 0, 15, 0.5)"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.draw(ctx);
        particle.update(particles, 10);

        if (particle.position.x + particle.radius > canvas.width) 
        {
            particle.position.x = 0 + particle.radius;
        }   
        if  (particle.position.x - particle.radius < 0) 
        {
            particle.position.x = canvas.width - particle.radius;
        }
        if (particle.position.y + particle.radius > canvas.height) 
        {
            particle.position.y = 0 + particle.radius;
        }   
        if  (particle.position.y - particle.radius < 0) 
        {
            particle.position.y = canvas.height - particle.radius;
        }
    });

    requestAnimationFrame(drawParticles);
} */


