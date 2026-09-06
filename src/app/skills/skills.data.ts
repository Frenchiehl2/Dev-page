/** A technology shown in the Skills section. */
export interface Skill {
  name: string;
  /**
   * Path to the logo, relative to the site base href (files live in public/).
   * These start as neutral initial-tiles: drop a real logo over the file in
   * public/logos/ and it appears here with no code change.
   */
  logo: string;
}

/**
 * Add a skill by adding an entry here and an SVG (or PNG) at the matching
 * path under public/logos/. The grid wraps to new rows on its own.
 *
 * The marks come from Simple Icons (CC0, so no attribution is required), with
 * SystemVerilog and VHDL drawn as lettering because no free icon exists for
 * them. Java uses the OpenJDK mark and C# the .NET one; neither has a slug of
 * its own. MATLAB is a raster: its logo is a gradient surface, so it is a
 * desaturated PNG rather than a vector.
 *
 * A new icon needs an explicit fill: Simple Icons ship a bare path with none,
 * which defaults to black, and loading through <img> means there is no
 * currentColor to inherit -- so it would render black on near-black and look
 * exactly like a missing file.
 */
export const SKILLS: Skill[] = [
  { name: 'C++', logo: 'logos/cpp.svg' },
  { name: 'C#', logo: 'logos/csharp.svg' },
  { name: 'Python', logo: 'logos/python.svg' },
  { name: 'postgresql', logo: 'logos/postgresql.svg' },
  { name: 'Java', logo: 'logos/java.svg' },
  { name: 'Angular', logo: 'logos/angular.svg' },
  { name: 'TypeScript', logo: 'logos/typescript.svg' },
  { name: 'Docker', logo: 'logos/docker.svg' },
  { name: 'Git', logo: 'logos/git.svg' },
  { name: 'Matlab', logo: 'logos/matlab.png' },
  { name: 'SystemVerilog', logo: 'logos/systemverilog.svg' },
  { name: 'VHDL', logo: 'logos/vhdl.svg' },
  { name: 'Blender', logo: 'logos/blender.svg' },
  { name: 'Unreal', logo: 'logos/unreal.svg' },
  { name: 'Unity', logo: 'logos/unity.svg' },
  { name: 'Godot', logo: 'logos/godot.svg' },
  { name: 'Vulkan', logo: 'logos/vulkan.svg' },
  { name: 'WebGL', logo: 'logos/webgl.svg' },
  { name: 'OpenGL', logo: 'logos/opengl.svg' },
  { name: 'Figma', logo: 'logos/figma.svg' },
  { name: 'Linux', logo: 'logos/linux.svg' },
];
