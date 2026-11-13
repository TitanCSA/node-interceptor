# node-interceptor

**Node.js / TypeScript bindings for the Microsoft-signed Interceptor Keyboard & Mouse Windows kernel filter driver.** Receive input from individual devices, modify or block events, and send input through their Windows device paths.

<!-- full-version-contact:start -->
> [!IMPORTANT]
> **Get the full driver version without demo restrictions**
>
> **Discord username: `titancsa`**
>
> Open Discord, choose **Friends > Add Friend**, enter **`titancsa`**, then send a direct message. Ask for the **full driver version without the demo time limit**, and mention **node-interceptor**.
>
> The demo limit belongs to **Interceptor Keyboard & Mouse**, the driver used by this project. Ask for pricing and the appropriate license / activation instructions; the application or wrapper source keeps its existing license.
<!-- full-version-contact:end -->

**[Download](https://github.com/TitanCSA/node-interceptor/releases/latest)** · [API](docs/API.md) · [Build/tests](docs/BUILD.md) · [Driver](https://github.com/TitanCSA/Interceptor-Keyboard-Mouse)

Adapted from [Rami-Sabbagh/node-interception](https://github.com/Rami-Sabbagh/node-interception). The `Interception`, `Device`, stroke types, filters and wait/send/receive workflow are preserved. A new native bridge uses TitanCSA's demo driver. The original Interception driver/DLL is not installed.

## Install

1. Install a supported **Node.js 20+** runtime on **Windows 10 1709+ / Windows 11 x64**.
2. Download **titancsa-node-interceptor-1.0.0.tgz** from this repository's release.
3. In your application folder:

```powershell
npm install .\titancsa-node-interceptor-1.0.0.tgz
npx node-interceptor /install
```

Accept the administrator prompt. **Restart Windows if requested**; setup exit `3010` means installation succeeded and a restart is needed. For the graphical setup use `npx node-interceptor --ui`. Package installation itself never elevates or modifies drivers.

Run capture scripts from an **administrator terminal**. Prebuilt Node-API 8 addons are included for x64 and ia32 Node on x64 Windows; no C++ compiler or runtime dependencies are required to use the downloaded package. The package is distributed on GitHub; do not substitute an unrelated package from the public npm registry.

```powershell
npx node-interceptor --status
npx node-interceptor /uninstall
```

The installer uses the same setup engine as the driver's own console/UI installers. Close capture applications before uninstalling. The graphical installer also offers diagnostics and restart guidance. An existing overlapping combined Interceptor edition must be uninstalled with its own setup first.

## Receive, change, forward

```javascript
const { Interception, FilterKeyState } = require('@titancsa/node-interceptor');
const input = new Interception();

async function main() {
  try {
    input.setFilter('keyboard', FilterKeyState.ALL);
    for (;;) {
      const device = await input.wait();
      if (!device) break;
      const stroke = device.receive();
      if (!stroke) continue;
      if (stroke.code === 0x1e) stroke.code = 0x30; // A -> B.
      device.send(stroke);                         // Forward other keys too.
    }
  } finally {
    if (!input.isDestroyed()) input.destroy();
  }
}
main().catch(console.error);
```

Keyboard states use the original API convention: **DOWN=0**, **UP=1**; E0/E1 are additional flag bits. This differs from AutoHotkey callback states. Keyboard `code` is a hardware scan code, not a Unicode character or virtual-key code.

`receive()` removes an event from its queue. Forward it with `send()` to keep it, modify its fields to remap it, or deliberately omit `send()` to block it. `wait(1000)` resolves to a device or `null` on timeout. Native faults reject/throw detailed English errors with `win32Code`; they are not silently reported as empty input.

TypeScript declarations are bundled. `require()` and ESM named imports work with the CommonJS entry point. See [examples](examples) for monitoring, blocking a selected key, remapping A/B, inverted mouse movement and device-specific handling.

## Compatibility

- Devices **1–10 are keyboards**, **11–20 are mouse devices**. Query connected devices instead of assuming a particular ID; IDs belong to the current capture.
- Get devices by family, inspect hardware IDs, set keyboard/mouse state filters, synthesize or forward scan codes, movement, buttons and wheel data.
- Async and synchronous waits; one outstanding wait per context. Async waits leave the JS event loop available. `destroy()` cancels a pending async wait and restores passthrough.
- Bounded native queue; overflow/driver revocation/expiry stop capture and surface an error. Objects and pending waits remain safe when a context closes.
- **One capture application at a time** with this driver. Close the viewer/AutoHotkey bridge before starting your script. Nonzero original cross-context `setPrecedence()` returns an explicit unsupported error; multi-process priority/chaining is not emulated.
- Ten device identities per family per capture, including disconnected identities. Recreate the context after substantial hot-plug changes. No ARM64 prebuild is supplied. Electron uses the Node-API binary, but every Electron release has not been tested.

Unselected events are forwarded by the bridge worker; the adapter does not install a second driver or add per-device kernel filtering. JS pauses/slow processing can still delay selected input. No zero-latency or universal device compatibility claim is made. Physical **Ctrl+Alt+Delete** revokes capture.

## Demo, source and licensing

The matching Interceptor-Keyboard-Mouse demo driver source is available; see
[driver/README.md](driver/README.md) for build instructions and separate
evaluation-source terms. Those terms apply to Titan-authored driver code. Third-party
source licenses and existing application/SDK licenses remain applicable. Full/commercial
implementation and private signing or activation material are excluded.

The bundled driver is the existing **one-hour demo per Windows kernel boot**, beginning with the first capture and shared across this edition's applications. At expiry capture/injection stop; physical input returns to passthrough. Closing, reinstalling or changing wrappers does not reset the allowance. Windows **Restart** starts a new allowance. For an unrestricted driver, DM **`titancsa` on Discord**.

The complete user-mode addon/wrapper source and the two-file Interceptor SDK are included. **Demo/evaluation driver source is documented in [driver/README.md](driver/README.md).** The adapted Node wrapper is **LGPL-3.0-or-later**, the SDK/bridge carry their MIT notices, and the signed driver has [separate binary terms](licenses/DRIVER.txt). See [NOTICE](NOTICE) for exact upstream revisions and changes.

## Responsible use

For lawful automation, accessibility, input customization, testing and research. Users are responsible for authorization, laws and third-party rules. Illegal or unauthorized use is not endorsed. The software is provided **AS IS**, without warranties or liability to the extent permitted by law; existing license terms and non-excludable rights remain applicable.

<!-- central-sdk-packages:start -->
## Paquets et installation

Les sources, licences, guides API et exemples sont regroupes dans [le depot SDK dedie](https://github.com/TitanCSA/sdk-packages/tree/main/projects/node-interceptor). Choisis le paquet a installer puis execute sa commande dans son dossier.

| Paquet | Registre | Disponibilite | Installation / utilisation |
| --- | --- | --- | --- |
| `node-interceptor` | vcpkg | Registre TitanCSA disponible (configuration ci-dessous) | `vcpkg install node-interceptor:x64-windows` |
| `node-interceptor` | Conan | Registre TitanCSA disponible (configuration ci-dessous) | `conan install --requires=node-interceptor/1.0.0 -r titancsa --build=missing -s compiler.cppstd=17` |
| `NodeInterceptor.Native` | NuGet | Publie et verifie | `Install-Package NodeInterceptor.Native -Version 1.0.0` |
| `NodeInterceptor.SDK` | NuGet | Publie et verifie | `dotnet add package NodeInterceptor.SDK --version 1.0.0` |
| `node_interceptor` | PyPI | Pas encore disponible / validation en cours | Commande prevue apres publication : `python -m pip install node-interceptor==1.0.0` |
| `node-interceptor` | Conda | Canal TitanCSA disponible ; acceptation conda-forge encore en attente | `conda install --override-channels -c https://raw.githubusercontent.com/TitanCSA/sdk-packages/089bc73095aa8eda89bacbe10d0b9e58394b0207/conda-channel -c conda-forge node-interceptor` |
| `node_interceptor` | crates.io | Publie et verifie | `cargo add node-interceptor@1.0.0` |
| `interceptor-keyboard-mouse` | npm | Publie et verifie | `npm install interceptor-keyboard-mouse@1.0.0` |
| `io.github.titancsa:node-interceptor` | Maven Central | Publie et verifie | `io.github.titancsa:node-interceptor:1.0.0 (pom.xml / Gradle)` |
| `com.github.TitanCSA:node-interceptor` | JitPack | Publie et verifie | `com.github.TitanCSA:node-interceptor:java-sdk-v1.0.0 (avec le depot JitPack)` |
| `github.com/TitanCSA/node-interceptor/node-interceptor-Go-modules` | Go Modules | Publie et verifie | `go get github.com/TitanCSA/node-interceptor/node-interceptor-Go-modules@v1.0.0` |
| `github.com/TitanCSA/node-interceptor/node-interceptor-Go-modules` | pkg.go.dev | Publie et verifie | `Documentation : https://pkg.go.dev/github.com/TitanCSA/node-interceptor/node-interceptor-Go-modules@v1.0.0` |
| `node_interceptor` | PowerShell Gallery | Publie et verifie | `Install-Module NodeInterceptor -RequiredVersion 1.0.0 -Scope CurrentUser` |
| `node_interceptor` | pub.dev | Pas encore disponible / validation en cours | Commande prevue apres publication : `dart pub add node_interceptor:1.0.0` |
| `node_interceptor` | RubyGems | Publie et verifie | `gem install node-interceptor -v 1.0.0` |
| `node_interceptor` | Packagist | Pas encore disponible / validation en cours | Commande prevue apres publication : `composer require titancsa/node-interceptor:1.0.0` |

Pour vcpkg et Conan, configure d abord le registre TitanCSA avec [le guide complet](https://github.com/TitanCSA/sdk-packages/tree/main/projects/node-interceptor/README.md). Le guide explique aussi Maven/Gradle, les prerequis et le chargement des DLL. Les pilotes/applications du produit sont installes separement. Les commandes marquees prevues ne sont pas encore disponibles.

Les anciens imports Go et versions JitPack gardent leurs tags. Pour les anciennes archives SDK, utilise [les liens de remplacement](https://github.com/TitanCSA/sdk-packages/blob/main/release-assets/URL-MIGRATION.json).
<!-- central-sdk-packages:end -->
