# Measure It

This is a test project that time tracks activities alone or in a given project.

## Provisioning

You can use Vagrant and Ansible to configure a development environment with all what is needed:

- MySQL
- Ruby 2.3
- bundler
- NodeJS

After installing Vagrant, VirtualBox and Ansible just run:

```bash
$ vagrant up
```

Wait for the process to complete and then load the schema with:

```bash
$ rake db:schema:load
```

Run local server with foreman

```bash
$ foreman start -f Procfile.dev
```
