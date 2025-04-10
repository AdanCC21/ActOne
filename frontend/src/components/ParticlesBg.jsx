import Particles from "./Particles"

export default function ParticlesBg() {
    return (
        <div style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: -1, overflow: "hidden" }}>
            <Particles
                particleColors={['#ffffff', '#ffffff']}
                particleCount={200}
                particleSpread={15}
                speed={0.1}
                particleBaseSize={80}
                moveParticlesOnHover={false}
                alphaParticles={false}
                disableRotation={false}
            />
        </div>
    )
}
