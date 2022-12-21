// Copyright © 2022 Geoffrey Huntley.
// The following code is covered by the MIT license.

const https = require("https");
const os = require("os");

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode >= 400) {
          reject(
            new Error(
              `Couldn't get ${url} - Response status: ${res.statusCode}`
            )
          );
          return;
        }

        let body = "";
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("error", (error) => {
          reject(error);
        });
        res.on("end", () => {
          resolve(body);
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

exports.register = async (fixers) => {
  const releases = await get(
    "https://github.com/hashicorp/terraform/tags.atom"
  );
  const versions = releases
    .match(/\/hashicorp\/terraform\/releases\/tag\/v\d+\.\d+\.\d+[^-]/g) // "match versions which do not have -alpha suffix"
    .map((path) => path.split("/")[5]);
  const latest = versions.shift().replace("v", "").replace('"','');

  fixers[0].push({
    id: "upgrade-terraform-toolchain",
    // Fix only non-binary files. Source: https://unix.stackexchange.com/a/36240
    cmd:
      `for file in \$(git grep -I --name-only -z -e '' | xargs -0 echo); do` +

      versions
        .map((version) => {
          const pattern = version.replace("v","").replace('"','').replace(/\./g, "\\.");
          return `
sed ${
            os.type() === "Darwin" ? '-i "" -E' : "-i -e"
          } "s/\\(terraform.*\\)${pattern}\\([^\d]\\)/\\1${latest}\\2/g" $file ;`;
        })
        .join("") +

        versions
        .map((version) => {
          const pattern = version.replace("v","").replace('"','').replace(/\./g, "\\.");
          return `
sed ${
            os.type() === "Darwin" ? '-i "" -E' : "-i -e"
          } "s/\\(terraform.*\\)${pattern}\\([^\d]\\)/\\1${latest}\\2/g" $file ;`;
        })
        .join("") +

        versions
        .map((version) => {
          const pattern = version.replace("v","").replace('"','').replace(/\./g, "\\.");
          return `
sed ${
            os.type() === "Darwin" ? '-i "" -E' : "-i -e"
          } "s/\\(TERRAFORM_VERSION.*\\)${pattern}\/\\1${latest}/g" $file ;`;
        })
        .join("") +

        versions
        .map((version) => {
          const pattern = version.replace("v","").replace('"','').replace(/\./g, "\\.");
          return `
sed ${
            os.type() === "Darwin" ? '-i "" -E' : "-i -e"
          } "s/\\(version\.NewVersion.*\\)${pattern}\/\\1${latest}/g" $file ;`;
        })
        .join("") +

        "\ndone",
    description: "Update pinned terraform toolchain versions",
  });
};
