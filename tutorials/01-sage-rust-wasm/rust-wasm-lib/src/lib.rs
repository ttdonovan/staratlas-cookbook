use bevy::prelude::*;
use bevy_embedded_assets::EmbeddedAssetPlugin;
use wasm_bindgen::prelude::*;

mod camera;
mod debug;
mod fleet;
mod movement;

#[wasm_bindgen]
pub fn run_bevy_app(fleets: Option<String>) {
    web_sys::console::log_2(&"RUST WASM: ".into(), &fleets.into());

    App::new()
        // Bevy build-ins
        .insert_resource(ClearColor(Color::rgb(0.1, 0.0, 0.15)))
        .insert_resource(AmbientLight {
            color: Color::default(),
            brightness: 0.75,
        })
        .add_plugins((EmbeddedAssetPlugin::default(), DefaultPlugins.set(WindowPlugin {
            primary_window: Some(Window {
                title: "Let's Play!".to_string(),
                resolution: (900.0, 600.0).into(),
                ..default()
            }),
            ..default()
        })))
        // User configured plugins
        .add_plugins(camera::CameraPlugin)
        .add_plugins(fleet::FleetPlugin)
        .add_plugins(movement::MovementPlugin)
        .add_plugins(debug::DebugPlugin)
        .run();
}