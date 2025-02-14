from typing import TypedDict, Tuple, Dict, List, Optional


class Banner(TypedDict):
    msg: Optional[str]  # None to disable banner
    a_href: str
    a_text: str


class Modules(TypedDict):
    javascript: Optional[List[str]]
    stylesheet: Optional[List[str]]


class Repo(TypedDict):
    pathname: str
    name: str
    branch: str
    visibility: str
    topic: Optional[Dict[str, str]]
    extra: Optional[Tuple[str, List[str], bool]]
    parent: Optional[str]


class LUT(TypedDict):
    remote_ssh: str
    remote_https: str
    source_hostname: str
    repos: Dict[str, Repo]
    banner: Banner
    modules: Modules


remote_ssh = "git@github.com:analogdevicesinc/{}.git"
remote_https = "https://github.com/analogdevicesinc/{}.git"
remote_doc = "https://analogdevicesinc.github.io/"
source_hostname = "https://github.com/analogdevicesinc/{repository}/tree/{branch}/{pathname}"

repos = {
    'documentation': Repo(
        pathname='docs',
        name='System Level',
        branch='main',
        visibility='public'
    ),
    'hdl': Repo(
        pathname='docs',
        extra=(
            # cwd      # cmd            # no_parallel
            "library", ["make", "all"], False
        ),
        name='HDL',
        branch='main',
        visibility='public'
    ),
    'testbenches': Repo(
        pathname='docs',
        name='HDL Testbenches',
        branch='main',
        visibility='public',
        parent='hdl'
    ),
    'pyadi-iio': Repo(
        pathname='doc/source',
        name='Hardware Python Interfaces',
        branch='main',
        visibility='public'
    ),
    'libiio': Repo(
        pathname='doc',
        name='libiio',
        branch='main',
        visibility='public'
    ),
    'no-OS': Repo(
        pathname='doc/sphinx/source',
        name='no-OS',
        branch='main',
        visibility='public'
    ),
    'precision-converters-firmware': Repo(
        pathname='doc/sphinx',
        name='Precision Converters Firmware',
        branch='main',
        visibility='public'
    ),
    'PrecisionToolbox': Repo(
        pathname='docs',
        name='Precision Toolbox',
        branch='main',
        visibility='public'
    ),
    'scopy': Repo(
        pathname='docs',
        name='Scopy',
        branch='dev',
        visibility='public'
    ),
    'doctools': Repo(
        pathname='docs',
        name='Doctools',
        branch='main',
        visibility='public'
    ),
}

banner = Banner(
    msg=None,
    a_href='',
    a_text=''
)

"""
Allows to inject extra scripts and stylesheets on the hosted documentation.
The app.js looks the metadata.json and insert tags to load each module of the array.
All files must be (generated) at the theme static folder, to be copied over the
documentation build.
The advantage of this approach is that regardless of the tools' built doc version,
it will always fetch the latest and greatest.
See also: ci/rollup.config.app.mjs
"""
modules = Modules(
    javascript=['extra.umd.js'],
    stylesheet=['extra.min.css']
)


def get_lut():
    # TODO dynamic lut fetch
    return LUT(remote_ssh=remote_ssh,
               remote_https=remote_https,
               source_hostname=source_hostname,
               repos=repos,
               banner=banner,
               modules=modules)
