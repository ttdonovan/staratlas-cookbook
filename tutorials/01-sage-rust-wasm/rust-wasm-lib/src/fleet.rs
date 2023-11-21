use bevy::prelude::*;

use crate::movement::Velocity;

const STARTING_TRANSLATION: Vec3 = Vec3::new(0.0, 0.0, -20.0);
const STARTING_VELOCITY: Vec3 = Vec3::new(0.0, 0.0, 1.0);

#[derive(Bundle)]
struct FleetBundle {
    velocity: Velocity,
    model: SceneBundle,
}

pub struct FleetPlugin;

impl Plugin for FleetPlugin {
    fn build(&self, app: &mut App) {
        app.add_systems(Startup, spawn_fleet);
    }
}

fn spawn_fleet(mut commands: Commands, asset_server: Res<AssetServer>) {
    let fleet = FleetBundle {
        velocity: Velocity {
            value: STARTING_VELOCITY,
        },
        model: SceneBundle {
            scene: asset_server.load("embedded://Spaceship.glb#Scene0"),
            transform: Transform::from_translation(STARTING_TRANSLATION),
            ..default()
        },
    };

    commands.spawn(fleet);
}
