import type { Route } from './+types/post';
import fs from 'fs/promises';

import { compile, run, runSync } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeShiki, { type RehypeShikiOptions } from '@shikijs/rehype';
import themecatppuccin from '@shikijs/themes/catppuccin-mocha';
import {
  transformerCompactLineOptions,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerRenderWhitespace,
} from '@shikijs/transformers';

const shikiOptions: RehypeShikiOptions = {
  theme: themecatppuccin,
  inline: 'tailing-curly-colon',
  // highlighter,

  // no need to pass langu as shiki already includes all the bundled languaegs
  // langs: ['ts', 'js', 'go'],
  transformers: [
    // transformerTwoslash({ renderer: rendererRich() }),
    transformerNotationDiff(),
    transformerNotationFocus(),
    transformerMetaHighlight(),
    transformerRenderWhitespace(),
    transformerNotationHighlight(),
    transformerMetaWordHighlight(),
    transformerNotationErrorLevel(),
    transformerCompactLineOptions(),
    transformerNotationWordHighlight(),
  ],
};

const mdxSource = `# Hello, world!`;

export async function loader({ params }: Route.LoaderArgs): Promise<any> {
  let content = '';

  let err = '';

  try {
    const file = await fs.readFile(`./content/${params.slug}.mdx`);
    // console.log(file.toString());
    content = file.toString();
  } catch (error) {
    console.log(error);
    err = String(error);
  }

  // console.log(content);

  const code = String(
    await compile(content, {
      outputFormat: 'function-body',
      rehypePlugins: [
        [
          //  exposing external links by mistake and give them follow it can harm the site reputaiton
          // so this plugin will automatically add rel=nofollow all the links
          rehypeExternalLinks,
          {
            properties: {
              target: '_blank',
              // rel: ['noopener noreferrer nofollow'],
            },
          },
        ],
        [rehypeShiki, shikiOptions],
      ],
    })
  );

  return {
    code: code,
    err: err,
  };
}

export function meta({ data }: Route.MetaArgs) {
  return [{ title: `Post` }];
}

export default function Post({ loaderData }: Route.ComponentProps) {
  // const MDXContent: any = loaderData;
  // console.log(loaderData);
  const { default: MDXContent } = runSync(loaderData.code, {
    ...runtime,
    baseUrl: import.meta.url,
  });

  // console.log(MDXContent);

  return (
    <div className='container mx-auto prose'>
      {loaderData?.err}
      <MDXContent />
    </div>
  );
}
