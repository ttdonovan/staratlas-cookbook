use macroquad::prelude::*;

#[macroquad::main("00-Basic")]
async fn main() {
    loop {
        clear_background(GRAY);

        draw_circle(screen_width() - 30.0, screen_height() - 30.0, 15.0, YELLOW);

        draw_text("00-BASIC", 20.0, 20.0, 30.0, DARKGRAY);

        next_frame().await
    }
}