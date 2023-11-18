use bevy::prelude::*;
use bevy_embedded_assets::EmbeddedAssetPlugin;

mod camera;
mod debug;
mod fleet;
mod movement;

fn main() {
    App::new()
        // Bevy build-ins
        .insert_resource(ClearColor(Color::rgb(0.1, 0.0, 0.15)))
        .insert_resource(AmbientLight {
            color: Color::default(),
            brightness: 0.75,
        })
        .add_plugins((EmbeddedAssetPlugin::default(), DefaultPlugins))
        // User configured plugins
        .add_plugins(camera::CameraPlugin)
        .add_plugins(fleet::FleetPlugin)
        .add_plugins(movement::MovementPlugin)
        .add_plugins(debug::DebugPlugin)
        .run();
}
