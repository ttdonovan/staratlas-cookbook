use bevy::prelude::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn run_bevy_app() {
    App::new()
        .add_plugins(DefaultPlugins.set(WindowPlugin {
            primary_window: Some(Window {
                title: "Let's Play!".to_string(),
                resolution: (900.0, 600.0).into(),
                ..default()
            }),
            ..default()
        }))
        .add_systems(Update, hello_world_system)
        .run();
}

fn hello_world_system() {
    println!("Hello world!");
}